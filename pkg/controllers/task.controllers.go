package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/services"
)

func GetAllTasks(c echo.Context) error {
	at := services.GetAllTasks()
	return c.JSON(http.StatusOK, at)
}

func CreateTask(c echo.Context) error {
	nt := new(models.Task)
	if err := c.Bind(nt); err != nil {
		return err
	}
	ct := nt.CreateTask()
	return c.JSON(http.StatusCreated, ct)
}

func GetTask(c echo.Context) error {
	p := c.Param("id")
	id, _ := strconv.Atoi(p)
	t, err := services.GetTask(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err)
	}
	return c.JSON(http.StatusOK, t)
}

func DeleteTask(c echo.Context) error {
	p := c.Param("id")
	id, _ := strconv.Atoi(p)
	dt, err := services.DeleteTask(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err)
	}
	return c.JSON(http.StatusOK, dt)
}
