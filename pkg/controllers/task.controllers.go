package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
)


var NewTask models.Task

func GetAllTasks(c echo.Context) error  {
	allTasks:=models.GetAllTasks()
	return c.JSON(http.StatusOK, allTasks)
}

func CreateTask(c echo.Context) error {
	newTask := new(models.Task)
	createdTask := models.CreateTask(newTask)
	
	return c.JSON(http.StatusOK, createdTask)
}