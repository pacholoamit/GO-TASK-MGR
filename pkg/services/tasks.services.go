package services

import (
	"errors"
	"fmt"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
)

func GetAllTasks() *models.Tasks {
	at := models.GetAllTasks()
	return at
}

func CreateTask(t *models.Task) models.Task {
	ct := t.CreateTask()
	return ct
}

func GetTask(id int) (*models.Task, error) {
	t := models.GetTask(id)
	if t.ID == 0 {
		return t, errors.New("task does not exist")
	}
	return t, nil
}

func DeleteTask(id int) (*models.Task, error) {
	dt := models.DeleteTask(id)
	fmt.Print(dt)
	if dt.ID == 0 {
		return dt, errors.New("task does not exist")
	}
	return dt, nil
}
