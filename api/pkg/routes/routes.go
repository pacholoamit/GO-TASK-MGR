package routes

import "github.com/labstack/echo/v4"

var (
	pr = NewProject()
)

var SetupRoutes = func(router *echo.Echo) {
	pr.Routes(router)
	Task.registerRoutes(router)
}
