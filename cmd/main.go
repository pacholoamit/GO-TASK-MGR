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
	"github.com/pacholoamit/GO-TASK-MGR/internal/middlewares"
	"github.com/pacholoamit/GO-TASK-MGR/internal/models"
	"github.com/pacholoamit/GO-TASK-MGR/internal/project"
	"github.com/pacholoamit/GO-TASK-MGR/internal/task"
	"github.com/pacholoamit/GO-TASK-MGR/internal/utils"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/dbcontext"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/log"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	e := echo.New()
	e.Static("/", "web/out") //<-- Web app

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

	db := startDB()
	l := log.New()
	registerHandler(e, l, db)

	portEnv, ok := os.LookupEnv("PORT")
	if !ok {
		portEnv = "8081"
	}
	// Graceful shutdown
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

func startDB() *dbcontext.DB {
	db, err := gorm.Open(sqlite.Open("./db/GO-TASK-MGR.db"), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})

	db.AutoMigrate(&models.Project{}, &models.Task{})

	if err != nil {
		panic("failed to connect to database")
	}

	return dbcontext.New(db)
}
func registerHandler(r *echo.Echo, l log.Logger, db *dbcontext.DB) {
	task.RegisterHandlers(r, task.NewService(task.NewRepository(db, l), l), l)
	project.RegisterHandlers(r, project.NewService(project.NewRepository(db, l), l), l)

}