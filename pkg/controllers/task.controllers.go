package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
)

func GetAllTasks(c echo.Context) error {
	at := models.GetAllTasks()
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
	t := models.GetTask(id)
	if t.ID == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "Task does not exist")
	}
	return c.JSON(http.StatusOK, t)
}

func DeleteTask(c echo.Context) error {
	p := c.Param("id")
	id, _ := strconv.Atoi(p)
	dt := models.DeleteTask(id)
	if dt.ID == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "Task does not exist")
	}
	return c.JSON(http.StatusOK, dt)
}
