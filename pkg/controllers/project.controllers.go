package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type project struct{}

var Project project

func (project) GetAllProjects(c echo.Context) error {
	return c.JSON(http.StatusOK, "All Projects")
}

func (project) CreateProject(c echo.Context) error {
	return c.JSON(http.StatusOK, "Creating Project")
}

func (project) GetProject(c echo.Context) error {
	return c.JSON(http.StatusOK, "Getting single project")
}

func (project) UpdateProject(c echo.Context) error {
	return c.JSON(http.StatusOK, "Updating a project")
}

func (project) DeleteProject(c echo.Context) error {
	return c.JSON(http.StatusOK, "Deleting a Project")
}
