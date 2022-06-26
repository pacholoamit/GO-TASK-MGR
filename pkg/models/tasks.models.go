package models

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	Title       string `gorm:"column:title" json:"title" form:"title" `
	Description string `gorm:"column:description" json:"description" form:"description"`
}

type Tasks []Task
