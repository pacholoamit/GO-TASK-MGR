package main

import (
	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/routes"
)

func main() {
	e := echo.New()
	routes.TaskRoutes(e)
	e.Logger.Fatal(e.Start(":1323"))
}
