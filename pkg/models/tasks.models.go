package models

import (
	"github.com/pacholoamit/GO-TASK-MGR/pkg/config"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Task struct {
	gorm.Model
	Title       string `gorm:"column:title" json:"title" form:"title" query:"title" `
	Description string `gorm:"column:description" json:"description" form:"description" query:"description"`
}

type Tasks []Task

type taskModel struct{}

var (
	TaskModel taskModel
	db        *gorm.DB
)

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Task{})
}

func (taskModel) CreateTask(t *Task) (*Task, error) {
	if err := db.Create(&t).Error; err != nil {
		return t, err
	}
	return t, nil
}

func (taskModel) GetAllTasks() (*Tasks, error) {
	var t *Tasks
	if err := db.Find(&t).Error; err != nil {
		return t, err
	}
	return t, nil
}

func (taskModel) GetTask(id int) (*Task, error) {
	var t *Task
	if err := db.Find(&t, id).Error; err != nil {
		return t, err
	}
	return t, nil
}

func (taskModel) DeleteTask(id int) (*Task, error) {
	var t *Task
	if err := db.Clauses(clause.Returning{}).Delete(&t, id).Error; err != nil {
		return t, err
	}
	return t, nil
}
