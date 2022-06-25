package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/controllers"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/middlewares"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/websockets"
)

var TaskRoutes = func(router *echo.Echo) {
	router.GET("/tasks", controllers.GetAllTasks)
	router.POST("/task", controllers.CreateTask)
	router.GET("/task/:id", controllers.GetTask, middlewares.ValidateQueryId)
	// router.PUT("/task/:id", controllers.UpdateTask)
	router.DELETE("/task/:id", controllers.DeleteTask, middlewares.ValidateQueryId)
}

var TaskWebSockets = func(router *echo.Echo) {
	router.GET("/websocket", websockets.GetAllTasks)
}
