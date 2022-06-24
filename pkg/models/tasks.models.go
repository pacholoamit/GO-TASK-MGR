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

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Task{})
}

func CreateTask(t *Task) *Task {
	db.Create(&t)
	return t
}

func GetAllTasks() []Task {
	var tasks []Task
	db.Find(&tasks)
	return tasks
}

// Todo: Error handling if ID is not found
func GetTask(id int) Task {
	var task Task
	db.Find(&task, id)
	return task
}
