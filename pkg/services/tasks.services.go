package services

import (
	"errors"
	"fmt"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/repositories"
)

type task struct{}

var Task task

func (task) GetAllTasks() (*models.Tasks, error) {
	at, err := repositories.Task.GetAllTasks()
	if err != nil {
		fmt.Println("Error when Getting all tasks:", err)
		return at, err
	}
	return at, nil
}

func (task) CreateTask(t *models.Task) (*models.Task, error) {
	ct, err := repositories.Task.CreateTask(t)
	if err != nil {
		fmt.Println("Error when Creating a task:", err)
		return ct, err
	}

	return ct, nil
}

func (task) GetTask(id int) (*models.Task, error) {
	gt, err := repositories.Task.GetTask(id)
	if (gt.ID == 0) || (err != nil) {
		fmt.Println("Error when Getting a task:", err)
		return gt, errors.New("task does not exist")
	}
	return gt, nil
}

func (task) UpdateTask(id int, t *models.Task) (*models.Task, error) {
	ut, err := repositories.Task.UpdateTask(id, t)
	if (ut.ID == 0) || (err != nil) {
		fmt.Println("Error when Updating a task:", err)
		return ut, errors.New("task does not exist")
	}
	return ut, nil
}

func (task) DeleteTask(id int) (*models.Task, error) {
	dt, err := repositories.Task.DeleteTask(id)
	if (dt.ID == 0) || (err != nil) {
		fmt.Println("Error when Deleting a task:", err)
		return dt, errors.New("task does not exist")
	}
	return dt, nil
}
