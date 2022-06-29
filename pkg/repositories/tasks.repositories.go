package repositories

import (
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"gorm.io/gorm/clause"
)

type task struct{}

var Task task

func (task) CreateTask(t *models.Task) (*models.Task, error) {
	if err := db.Omit(clause.Associations).Create(&t).Error; err != nil {
		return t, err
	}
	return t, nil
}

func (task) GetAllTasks() (*models.Tasks, error) {
	var tasksModel models.Tasks
	if err := db.Find(&tasksModel).Error; err != nil {
		return &tasksModel, err
	}
	return &tasksModel, nil
}

func (task) GetTask(id int) (*models.Task, error) {
	var taskModel *models.Task
	if err := db.Find(&taskModel, id).Error; err != nil {
		return taskModel, err
	}
	return taskModel, nil
}

func (task) UpdateTask(id int, t *models.Task) (*models.Task, error) {
	var taskModel models.Task

	if err := db.Clauses(clause.Returning{}).Find(&taskModel, id).Updates(t).Error; err != nil {
		return &taskModel, err
	}

	return &taskModel, nil
}

func (task) DeleteTask(id int) (*models.Task, error) {
	var taskModel models.Task
	if err := db.Clauses(clause.Returning{}).Delete(&taskModel, id).Error; err != nil {
		return &taskModel, err
	}
	return &taskModel, nil
}

func (task) UpdateTaskProject(id int, pid int) (*models.Task, error) {
	var taskModel models.Task
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
