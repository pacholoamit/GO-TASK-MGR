package models

import "gorm.io/gorm"

type Project struct {
	gorm.Model
	Name  string `json:"Name" form:"Name"`
	Color string `json:"Color" form:"Color"`
}

type Task struct {
	gorm.Model
	Title       string `json:"title" form:"title"`
	Description string `json:"description" form:"description"`
	Status      string `json:"status" form:"status"`
	Label       string `json:"label" form:"label"`
	ProjectID   int
	Project     Project `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type Tasks []Task
