package services

import (
	"errors"
	"fmt"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
)

func GetAllTasks() (*models.Tasks, error) {
	at, err := models.TaskModel.GetAllTasks()
	if err != nil {
		return at, err
	}
	return at, nil
}

func CreateTask(t *models.Task) (*models.Task, error) {
	ct, err := models.TaskModel.CreateTask(t)
	if err != nil {
		return ct, err
	}

	return ct, nil
}

func GetTask(id int) (*models.Task, error) {
	t, err := models.TaskModel.GetTask(id)
	if (t.ID == 0) || (err != nil) {
		return t, errors.New("task does not exist")
	}
	return t, nil
}

func DeleteTask(id int) (*models.Task, error) {
	dt, err := models.TaskModel.DeleteTask(id)
	fmt.Print(dt)
	if (dt.ID == 0) || (err != nil) {
		return dt, errors.New("task does not exist")
	}
	return dt, nil
}
