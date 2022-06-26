package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/controllers"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/middlewares"
)

var TaskRoutes = func(router *echo.Echo) {
	router.GET("/tasks", controllers.Task.GetAllTasks)
	router.POST("/task", controllers.Task.CreateTask)
	router.GET("/task/:id", controllers.Task.GetTask, middlewares.ValidateQueryId)
	router.PUT("/task/:id", controllers.Task.UpdateTask, middlewares.ValidateQueryId)
	router.DELETE("/task/:id", controllers.Task.DeleteTask, middlewares.ValidateQueryId)
}
