package main

import (
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/routes"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/utils"
)

func main() {
	e := echo.New()

	e.Validator = &utils.CustomValidator{Validator: validator.New()}

	e.Use(middleware.Secure())
	e.Use(middleware.Recover()) // Recover from panics
	e.Use(middleware.GzipWithConfig(middleware.GzipConfig{Level: 5}))
	// e.Use(middleware.Logger())
	e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20))) // 20 request/sec rate limit

	routes.SetupRoutes(e)
	e.Logger.Fatal(e.Start(":8081"))
}
