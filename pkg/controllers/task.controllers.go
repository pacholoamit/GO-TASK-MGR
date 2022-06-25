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
	return c.JSON(http.StatusCreated, createdTask)
}

func GetTask(c echo.Context) error {
	p := c.Param("id")
	id, _ := strconv.Atoi(p)
	task := models.GetTask(id)
	if task.ID == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "Task does not exist")
	}
	return c.JSON(http.StatusOK, task)
}

func DeleteTask(c echo.Context) error {
	p := c.Param("id")
	id, _ := strconv.Atoi(p)
	task := models.DeleteTask(id)
	if task.ID == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "Task does not exist")
	}
	return c.JSON(http.StatusOK, task)
}
