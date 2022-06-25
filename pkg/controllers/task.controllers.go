package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
)

func GetAllTasks(c echo.Context) error {
	allTasks := models.GetAllTasks()
	return c.JSON(http.StatusOK, allTasks)
}

func CreateTask(c echo.Context) error {
	task := new(models.Task)
	if err := c.Bind(task); err != nil {
		return err
	}
	createdTask := task.CreateTask()
	return c.JSON(http.StatusOK, createdTask)
}

func GetTask(c echo.Context) error {
	p := c.Param("id")
	id,  err := strconv.Atoi(p)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "You have provided an invalid ID")
	}
	task := models.GetTask(id)
	return c.JSON(http.StatusFound, task)
}

func DeleteTask(c echo.Context) error {
	p := c.Param("id")
	id, err := strconv.Atoi(p)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "You have provided an invalid ID")
	}
	
	models.DeleteTask(id)
	return c.String(http.StatusAccepted, "Successfully deleted Task: "+p)
}
