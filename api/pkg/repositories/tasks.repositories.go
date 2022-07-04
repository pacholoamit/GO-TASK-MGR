package repositories

import (
	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"gorm.io/gorm/clause"
)

type task struct{}

var Task task

func (task) CreateTask(t *dto.Task) (*dto.Task, error) {

	if err := db.Create(&t).Error; err != nil {
		return t, err
	}

	return t, nil
}

func (task) GetAllTasks() (*dto.Tasks, error) {
	var tasksModel dto.Tasks
	if err := db.Find(&tasksModel).Error; err != nil {
		return &tasksModel, err
	}
	return &tasksModel, nil
}

func (task) GetTask(id int) (*dto.Task, error) {
	var taskModel *dto.Task
	if err := db.Find(&taskModel, id).Error; err != nil {
		return taskModel, err
	}
	return taskModel, nil
}

func (task) UpdateTask(id int, t *dto.Task) (*dto.Task, error) {
	var taskModel dto.Task

	if err := db.Clauses(clause.Returning{}).Find(&taskModel, id).Updates(t).Error; err != nil {
		return &taskModel, err
	}

	return &taskModel, nil
}

func (task) DeleteTask(id int) (*dto.Task, error) {
	var taskModel dto.Task
	if err := db.Clauses(clause.Returning{}).Delete(&taskModel, id).Error; err != nil {
		return &taskModel, err
	}
	return &taskModel, nil
}

func (task) UpdateTaskProject(id int, pid int) (*dto.Task, error) {
	var taskModel dto.Task
	var projectModel models.Project

	if err := db.Clauses(clause.Returning{}).Find(&taskModel, id).Error; err != nil {
		return &taskModel, err
	}

	if err := db.Clauses(clause.Returning{}).Find(&projectModel, pid).Error; err != nil {
		return &taskModel, err
	}

	// Update Project association if any provided
	// db.Model(&mt).Association("Project").Replace(&t.Project)

	// Find Project to associate by ID (1)
	// if err := db.Clauses(clause.Returning{}).Find(&mp, 1).Error; err != nil {
	// 	return mt, err
	// }

	// db.Model(&mt).Association("Project").Replace(mp)

	db.Model(&taskModel).Association("Project").Replace(&projectModel)

	return &taskModel, nil
}
