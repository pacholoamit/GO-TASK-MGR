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
	mt   *models.Task
	mts  *models.Tasks
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
	if err := db.Find(&mts).Error; err != nil {
		return mts, err
	}
	return mts, nil
}

func (task) GetTask(id int) (*models.Task, error) {
	if err := db.Find(&mt, id).Error; err != nil {
		return mt, err
	}
	return mt, nil
}

func (task) UpdateTask(id int, t *models.Task) (*models.Task, error) {
	if err := db.Clauses(clause.Returning{}).Find(&mt, id).Updates(t).Error; err != nil {
		return mt, err
	}

	return mt, nil
}

func (task) DeleteTask(id int) (*models.Task, error) {
	if err := db.Clauses(clause.Returning{}).Delete(&mt, id).Error; err != nil {
		return mt, err
	}
	return mt, nil
}