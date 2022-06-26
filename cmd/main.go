package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/routes"
)

func main() {
	e := echo.New()

	e.Use(middleware.Secure())
	e.Use(middleware.Recover()) // Recover from panics
	e.Use(middleware.GzipWithConfig(middleware.GzipConfig{Level: 5}))
	e.Use(middleware.Logger())
	e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20))) // 20 request/sec rate limit

	routes.TaskRoutes(e)
	e.Logger.Fatal(e.Start(":8081"))
}
