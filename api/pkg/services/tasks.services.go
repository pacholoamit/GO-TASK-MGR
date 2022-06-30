package services

import (
	"fmt"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/repositories"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/utils"
)

type task struct{}

var (
	Task            task
	taskNonExistErr = utils.NonExistentError("task")
)

func (task) GetAllTasks() (*dto.Tasks, error) {
	tasks, err := repositories.Task.GetAllTasks()
	if err != nil {
		fmt.Println("Error when Getting all tasks:", err)
		return tasks, err
	}
	return tasks, nil
}

func (task) CreateTask(t *dto.Task) (*dto.Task, error) {
	createdTask, err := repositories.Task.CreateTask(t)
	if err != nil {
		fmt.Println("Error when Creating a task:", err)
		return createdTask, err
	}

	return createdTask, nil
}

func (task) GetTask(id int) (*dto.Task, error) {
	task, err := repositories.Task.GetTask(id)

	if task.ID == 0 {
		fmt.Print("Error when Getting a task:", taskNonExistErr)
		return task, taskNonExistErr
	}

	if err != nil {
		fmt.Println("Error when Getting a task:", err)
		return task, err
	}
	return task, nil
}

func (task) UpdateTask(id int, t *dto.Task) (*dto.Task, error) {
	updatedTask, err := repositories.Task.UpdateTask(id, t)

	if updatedTask.ID == 0 {
		fmt.Print("Error when Updating a task:", taskNonExistErr)
		return updatedTask, taskNonExistErr
	}
	if err != nil {
		fmt.Println("Error when Updating a task:", err)
		return updatedTask, taskNonExistErr
	}
	return updatedTask, nil
}

func (task) DeleteTask(id int) (*dto.Task, error) {
	deletedTask, err := repositories.Task.DeleteTask(id)

	if deletedTask.ID == 0 {
		fmt.Print("Error when Deleting a task:", taskNonExistErr)
		return deletedTask, taskNonExistErr
	}
	if err != nil {
		fmt.Println("Error when Deleting a task:", err)
		return deletedTask, taskNonExistErr
	}
	return deletedTask, nil
}
