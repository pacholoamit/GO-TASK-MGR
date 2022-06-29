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
	tasks, err := repositories.Task.GetAllTasks()
	if err != nil {
		fmt.Println("Error when Getting all tasks:", err)
		return tasks, err
	}
	return tasks, nil
}

func (task) CreateTask(t *models.Task) (*models.Task, error) {
	createdTask, err := repositories.Task.CreateTask(t)
	if err != nil {
		fmt.Println("Error when Creating a task:", err)
		return createdTask, err
	}

	return createdTask, nil
}

func (task) GetTask(id int) (*models.Task, error) {
	task, err := repositories.Task.GetTask(id)
	if (task.ID == 0) || (err != nil) {
		fmt.Println("Error when Getting a task:", err)
		return task, errors.New("task does not exist")
	}
	return task, nil
}

func (task) UpdateTask(id int, t *models.Task) (*models.Task, error) {
	updatedTask, err := repositories.Task.UpdateTask(id, t)
	if (updatedTask.ID == 0) || (err != nil) {
		fmt.Println("Error when Updating a task:", err)
		return updatedTask, errors.New("task does not exist")
	}
	return updatedTask, nil
}

func (task) DeleteTask(id int) (*models.Task, error) {
	deletedTask, err := repositories.Task.DeleteTask(id)
	if (deletedTask.ID == 0) || (err != nil) {
		fmt.Println("Error when Deleting a task:", err)
		return deletedTask, errors.New("task does not exist")
	}
	return deletedTask, nil
}
