package routes

import "github.com/labstack/echo/v4"

var SetupRoutes = func(router *echo.Echo) {
	Project.registerRoutes(router)
	Task.registerRoutes(router)
}
