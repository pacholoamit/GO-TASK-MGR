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
	ap, err := services.Project.GetAllProjects()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, ap)
}

func (project) CreateProject(c echo.Context) error {
	pr := new(models.Project)
	if err := c.Bind(pr); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	if err := c.Validate(pr); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	cp, err := services.Project.CreateProject(pr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusCreated, cp)
}

func (project) GetProject(c echo.Context) error {
	p := c.Param("id")
	id, _ := strconv.Atoi(p)
	gp, err := services.Project.GetProject(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err)
	}
	return c.JSON(http.StatusOK, gp)
}

func (project) UpdateProject(c echo.Context) error {
	p := c.Param("id")
	pr := new(models.Project)
	id, _ := strconv.Atoi(p)

	if err := c.Bind(pr); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	up, err := services.Project.UpdateProject(id, pr)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err)
	}
	return c.JSON(http.StatusOK, up)
}

func (project) DeleteProject(c echo.Context) error {
	p := c.Param("id")
	id, _ := strconv.Atoi(p)
	dp, err := services.Project.DeleteProject(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err)
	}
	return c.JSON(http.StatusOK, dp)
}
