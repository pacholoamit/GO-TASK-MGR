package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/services"
)

type task struct{}

var Task task

func (task) GetAllTasks(c echo.Context) error {
	at, err := services.Task.GetAllTasks()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, at)
}

func (task) CreateTask(c echo.Context) error {
	t := new(models.Task)
	if err := c.Bind(t); err != nil {
		return err
	}

	ct, err := services.Task.CreateTask(t)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusCreated, ct)
}

func (task) GetTask(c echo.Context) error {
	p := c.Param("id")
	id, _ := strconv.Atoi(p)
	gt, err := services.Task.GetTask(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err)
	}
	return c.JSON(http.StatusOK, gt)
}

func (task) UpdateTask(c echo.Context) error {
	t := new(models.Task)
	p := c.Param("id")
	id, _ := strconv.Atoi(p)

	if err := c.Bind(t); err != nil {
		return err
	}

	ut, err := services.Task.UpdateTask(id, t)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err)
	}
	return c.JSON(http.StatusOK, ut)
}

func (task) DeleteTask(c echo.Context) error {
	p := c.Param("id")
	id, _ := strconv.Atoi(p)
	dt, err := services.Task.DeleteTask(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err)
	}
	return c.JSON(http.StatusOK, dt)
}
