package routes

import "github.com/labstack/echo/v4"

var (
	pr = NewProjectRoutes()
)

var SetupRoutes = func(router *echo.Echo) {
	pr.ProjectRoutes(router)
	Task.registerRoutes(router)
}
