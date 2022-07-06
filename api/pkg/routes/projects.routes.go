package routes

import (
	"log"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/controllers"
)

var (
	l = log.New(os.Stdout, "projects-controller: ", log.LstdFlags)
	c = controllers.NewProject(l)
)

type Project struct{}

func NewProject() *Project {
	return &Project{}
}

func (pr Project) Routes(router *echo.Echo) {
	router.GET("/projects", c.GetAllProjects)
	router.POST("/project", c.CreateProject)
	router.GET("/project/:id", c.GetProject)
	router.PUT("/project/:id", c.UpdateProject)
	router.DELETE("/project/:id", c.DeleteProject)
	router.PUT("/project/:projectId/task/:taskId", c.AssignTaskToProject)
	router.GET("/project/:projectId/tasks", c.GetAllTasksInProject)

}
