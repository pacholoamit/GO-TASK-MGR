package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/controllers"
)

type task struct{}

var Task task

func (task) registerRoutes(router *echo.Echo) {
	router.GET("/tasks", controllers.Task.GetAllTasks)
	router.POST("/task", controllers.Task.CreateTask)
	router.GET("/task/:id", controllers.Task.GetTask)
	router.PUT("/task/:id", controllers.Task.UpdateTask)
	router.DELETE("/task/:id", controllers.Task.DeleteTask)
}
