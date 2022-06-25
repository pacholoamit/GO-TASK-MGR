package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/routes"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	routes.TaskRoutes(e)
	e.Logger.Fatal(e.Start(":8081"))
}
