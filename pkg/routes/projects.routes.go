package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/controllers"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/middlewares"
)

var ProjectRoutes = func(router *echo.Echo) {
	router.GET("/projects", controllers.Project.GetAllProjects)
	router.POST("/project", controllers.Project.CreateProject)
	router.GET("/project/:id", controllers.Project.GetProject, middlewares.ValidateQueryId)
	router.PUT("/project/:id", controllers.Project.UpdateProject, middlewares.ValidateQueryId)
	router.DELETE("/project/:id", controllers.Project.DeleteProject, middlewares.ValidateQueryId)
}
