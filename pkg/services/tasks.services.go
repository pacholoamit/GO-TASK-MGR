package services

import (
	"fmt"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/repositories"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/utils"
)

type task struct{}

var (
	Task        task
	nonExistErr = utils.NonExistentError("task")
)

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

	if task.ID == 0 {
		fmt.Print("Error when Getting a task:", nonExistErr)
		return task, nonExistErr
	}

	if err != nil {
		fmt.Println("Error when Getting a task:", err)
		return task, err
	}
	return task, nil
}

func (task) UpdateTask(id int, t *models.Task) (*models.Task, error) {
	updatedTask, err := repositories.Task.UpdateTask(id, t)

	if updatedTask.ID == 0 {
		fmt.Print("Error when Updating a task:", nonExistErr)
		return updatedTask, nonExistErr
	}
	if err != nil {
		fmt.Println("Error when Updating a task:", err)
		return updatedTask, nonExistErr
	}
	return updatedTask, nil
}

func (task) DeleteTask(id int) (*models.Task, error) {
	deletedTask, err := repositories.Task.DeleteTask(id)

	if deletedTask.ID == 0 {
		fmt.Print("Error when Deleting a task:", nonExistErr)
		return deletedTask, nonExistErr
	}
	if err != nil {
		fmt.Println("Error when Deleting a task:", err)
		return deletedTask, nonExistErr
	}
	return deletedTask, nil
}
