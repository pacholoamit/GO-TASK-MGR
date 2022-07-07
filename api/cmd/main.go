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
	"github.com/pacholoamit/GO-TASK-MGR/common/log"
	"github.com/pacholoamit/GO-TASK-MGR/internal/task"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/middlewares"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/utils"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// TODO: Implement validators
// TODO: Immplement contexts
// TODO: Implement middlewares

func main() {
	e := echo.New()
	e.Validator = &utils.CustomValidator{Validator: validator.New()}
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
	// routes.SetupRoutes(e)

	// Set up DB
	db, err := gorm.Open(sqlite.Open("GO-TASK-MGR.db"), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})
	if err != nil {
		panic("failed to connect to database")
	}

	// Set up logger
	l := log.New()
	registerHandler(e, l, db)

	// Graceful shutdown
	portEnv, ok := os.LookupEnv("PORT")
	if !ok {
		portEnv = "8081"
	}

	go func() {
		if err := e.Start(":" + portEnv); err != nil && err != http.ErrServerClosed {
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

func registerHandler(r *echo.Echo, l log.Logger, db *gorm.DB) {
	task.RegisterHandlers(r, task.NewService(task.NewRepository(db, l), l), l)
}
