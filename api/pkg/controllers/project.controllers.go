package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/services"
)

type project struct{}

var Project project

func (project) GetAllProjects(c echo.Context) error {
	projects, err := services.Project.GetAllProjects()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, projects)
}

func (project) CreateProject(c echo.Context) error {
	projectModel := new(models.Project)
	if err := c.Bind(projectModel); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	if err := c.Validate(projectModel); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	createdProject, err := services.Project.CreateProject(projectModel)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusCreated, createdProject)
}

// G
func (project) GetProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	project, err := services.Project.GetProject(id)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, project)
}

func (project) UpdateProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	projectModel := new(models.Project)

	if err := c.Bind(projectModel); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	updatedProject, err := services.Project.UpdateProject(id, projectModel)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, updatedProject)
}

func (project) DeleteProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	deletedProject, err := services.Project.DeleteProject(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, deletedProject)
}

// Note add error handling here
func (project) AssignTaskToProject(c echo.Context) error {
	projectId, _ := strconv.Atoi(c.Param("projectId"))
	taskId, _ := strconv.Atoi(c.Param("taskId"))

	message, err := services.Project.AssignTaskToProject(taskId, projectId)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.String(http.StatusOK, message)

}

func (project) GetAllTasksInProject(c echo.Context) error {
	projectId, _ := strconv.Atoi(c.Param("projectId"))

	message, err := services.Project.GetAllTasksInProject(projectId)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, message)

}
