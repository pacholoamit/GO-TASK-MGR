package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
)


var NewTask models.Task

func GetAllTasks(c echo.Context) error  {
	newTasks:=models.GetAllTasks()
	return c.JSON(http.StatusOK, newTasks)
}

func CreateTask(c echo.Context) error {
	t := new(models.Task)
	if err := c.Bind(t); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, t)
}