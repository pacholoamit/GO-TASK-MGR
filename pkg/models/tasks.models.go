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

var (
	db *gorm.DB
)

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Task{})
}

func (t Task) CreateTask() Task {
	db.Create(&t)
	return t
}

func GetAllTasks() *Tasks {
	var t *Tasks
	db.Find(&t)
	return t
}

func GetTask(id int) *Task {
	var t *Task
	db.Find(&t, id)
	return t
}

func DeleteTask(id int) *Task {
	var t *Task
	db.Clauses(clause.Returning{}).Delete(&t, id)
	return t
}
