package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/controllers"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/middlewares"
)

var TaskRoutes = func(router *echo.Echo) {
	router.GET("/tasks", controllers.GetAllTasks)
	router.POST("/task", controllers.CreateTask)
	router.GET("/task/:id", controllers.GetTask, middlewares.ValidateQueryId)
	// router.PUT("/task/:id", controllers.UpdateTask, middlewares.ValidateQueryId)
	router.DELETE("/task/:id", controllers.DeleteTask, middlewares.ValidateQueryId)
}
