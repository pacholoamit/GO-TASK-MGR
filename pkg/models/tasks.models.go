package models

import (
	"github.com/pacholoamit/GO-TASK-MGR/pkg/config"
	"gorm.io/gorm"
)

var db *gorm.DB

type Task struct {
	gorm.Model
	Title       string `gorm:"column:title" json:"title" form:"title" query:"title" `
	Description string `gorm:"column:description" json:"description" form:"description" query:"description"`
}

type Tasks []Task

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Task{})
}

func (t *Task) CreateTask() *Task {
	db.Create(&t)
	return t
}

func GetAllTasks() *Tasks {
	var t *Tasks
	db.Find(&t)
	return t
}

// Todo: Error handling if ID is not found
func GetTask(id int) *Task {
	var t *Task
	db.Find(&t, id)
	return t
}

func DeleteTask(id int) *Task {
	var t *Task
	db.Delete(&t, id)
	return t
}
