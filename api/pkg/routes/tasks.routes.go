package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/controllers"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/middlewares"
)

type task struct{}

var Task task

func (task) registerRoutes(router *echo.Echo) {
	router.GET("/tasks", controllers.Task.GetAllTasks)
	router.POST("/task", controllers.Task.CreateTask)
	router.GET("/task/:id", controllers.Task.GetTask, middlewares.ValidateDynamicParamIds)
	router.PUT("/task/:id", controllers.Task.UpdateTask, middlewares.ValidateDynamicParamIds)
	router.DELETE("/task/:id", controllers.Task.DeleteTask, middlewares.ValidateDynamicParamIds)
}
