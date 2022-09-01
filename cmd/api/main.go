package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/pacholoamit/GO-TASK-MGR/internal/auth"
	"github.com/pacholoamit/GO-TASK-MGR/internal/config"
	"github.com/pacholoamit/GO-TASK-MGR/internal/middlewares"
	"github.com/pacholoamit/GO-TASK-MGR/internal/project"
	"github.com/pacholoamit/GO-TASK-MGR/internal/task"
	"github.com/pacholoamit/GO-TASK-MGR/internal/utils"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/dbcontext"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/log"
	"github.com/pacholoamit/GO-TASK-MGR/web"
)

const version = "0.0.1"

func main() {
	conf := config.New(os.Getenv("PORT"), os.Getenv("ENV"))
	l := log.New()
	e := echo.New()
	app := conf.Bootstrap()

	jwt := middleware.JWTConfig{
		Claims:     auth.JwtCustomClaims{},
		SigningKey: []byte("secret"),
	}
	e.Validator = &utils.CustomValidator{Validator: validator.New()}
	e.Use(middleware.JWTWithConfig(jwt))

	e.Use(middleware.CORS())
	e.Use(middleware.TimeoutWithConfig(middleware.TimeoutConfig{Timeout: 10 * time.Second}))
	e.Use(middleware.Secure())
	e.Use(middleware.Recover())
	e.Use(middleware.GzipWithConfig(middleware.GzipConfig{Level: 5}))
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${method} ${uri} ${status} ${latency_human} ${error}\n",
	}))
	e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20))) // 20 request/sec rate limit
	e.Use(middlewares.ValidateDynamicParamIds)                              // Validates dynamic param IDs

	// Register handlers or routes
	h := Handlers{e, l, app.Db}
	h.registerRestricted()
	h.registerPublic()

	// Graceful shutdown
	go func() {
		if err := e.Start(":" + app.Port); err != nil && err != http.ErrServerClosed {
			e.Logger.Error(err)
			e.Logger.Fatal("shutting down the server")
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}

type Handlers struct {
	r  *echo.Echo
	l  log.Logger
	db *dbcontext.DB
}

func (h Handlers) registerRestricted() {
	restricted := auth.RegisterHandlers(h.r)
	task.RegisterHandlers(restricted, task.NewService(task.NewRepository(h.db, h.l), h.l), h.l)
	project.RegisterHandlers(restricted, project.NewService(project.NewRepository(h.db, h.l), h.l), h.l)

}

func (h Handlers) registerPublic() {
	web.RegisterHandlers(h.r)
}
