package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/services"
)

type task struct{}

var Task task

func (task) GetAllTasks(c echo.Context) error {
	tasks, err := services.Task.GetAllTasks()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, tasks)
}

func (task) CreateTask(c echo.Context) error {
	taskModel := new(dto.Task)

	if err := c.Bind(taskModel); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	// Issue where validating project is required
	if err := c.Validate(taskModel); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	createdTask, err := services.Task.CreateTask(taskModel)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusCreated, createdTask)
}

func (task) GetTask(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	task, err := services.Task.GetTask(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, task)
}

func (task) UpdateTask(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	taskModel := new(dto.Task)

	if err := c.Bind(taskModel); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	updatedTask, err := services.Task.UpdateTask(id, taskModel)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, updatedTask)
}

func (task) DeleteTask(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	deletedTask, err := services.Task.DeleteTask(id)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, deletedTask)
}
