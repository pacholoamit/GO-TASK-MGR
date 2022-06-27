package repositories

import (
	"fmt"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"gorm.io/gorm/clause"
)

type task struct{}

var Task task

func (task) CreateTask(t *models.Task) (*models.Task, error) {
	if err := db.Create(&t).Error; err != nil {
		return t, err
	}
	return t, nil
}

func (task) GetAllTasks() (*models.Tasks, error) {
	var mts *models.Tasks
	if err := db.Find(&mts).Error; err != nil {
		return mts, err
	}
	return mts, nil
}

func (task) GetTask(id int) (*models.Task, error) {
	var mt *models.Task
	if err := db.Find(&mt, id).Error; err != nil {
		return mt, err
	}
	return mt, nil
}

func (task) UpdateTask(id int, t *models.Task) (*models.Task, error) {
	var mt *models.Task

	// mock := &models.Task{
	// 	Title: "Hello",
	// }
	// if err := db.Clauses(clause.Returning{}).Find(&mt, id).Updates(t).Error; err != nil {
	// 	return mt, err
	// }

	db.Clauses(clause.Returning{}).Find(&mt, id)
	fmt.Print(mt)
	db.Model(&mt).Association("Project").Replace(&t.Project)
	fmt.Print(mt)
	return mt, nil
}

func (task) DeleteTask(id int) (*models.Task, error) {
	var mt *models.Task
	if err := db.Clauses(clause.Returning{}).Delete(&mt, id).Error; err != nil {
		return mt, err
	}
	return mt, nil
}
