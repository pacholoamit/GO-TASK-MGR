package routes

import (
	"log"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/controllers"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/middlewares"
)

var (
	l = log.New(os.Stdout, "projects-controller", log.LstdFlags)
	c = controllers.NewProject(l)
)

type Project struct{}

func NewProject() *Project {
	return &Project{}
}

func (pr Project) Routes(router *echo.Echo) {
	router.GET("/projects", c.GetAllProjects)
	router.POST("/project", c.CreateProject)
	router.GET("/project/:id", c.GetProject, middlewares.ValidateQueryId)
	router.PUT("/project/:id", c.UpdateProject, middlewares.ValidateQueryId)
	router.DELETE("/project/:id", c.DeleteProject, middlewares.ValidateQueryId)
	router.PUT("/project/:projectId/task/:taskId", c.AssignTaskToProject)
	router.GET("/project/:projectId/tasks", c.GetAllTasksInProject)

}
