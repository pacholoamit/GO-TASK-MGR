package repositories

import (
	"github.com/pacholoamit/GO-TASK-MGR/pkg/config"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type task struct{}

var (
	Task task
	db   *gorm.DB
)

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&models.Task{})
}

func (task) CreateTask(t *models.Task) (*models.Task, error) {
	if err := db.Create(&t).Error; err != nil {
		return t, err
	}
	return t, nil
}

func (task) GetAllTasks() (*models.Tasks, error) {
	var t *models.Tasks
	if err := db.Find(&t).Error; err != nil {
		return t, err
	}
	return t, nil
}

func (task) GetTask(id int) (*models.Task, error) {
	var t *models.Task
	if err := db.Find(&t, id).Error; err != nil {
		return t, err
	}
	return t, nil
}

func (task) UpdateTask(id int, t *models.Task) (*models.Task, error) {
	var ut *models.Task
	if err := db.Clauses(clause.Returning{}).Find(&ut, id).Updates(t).Error; err != nil {
		return ut, err
	}

	return ut, nil
}

func (task) DeleteTask(id int) (*models.Task, error) {
	var dt *models.Task
	if err := db.Clauses(clause.Returning{}).Delete(&dt, id).Error; err != nil {
		return dt, err
	}
	return dt, nil
}
