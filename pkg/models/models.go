package models

import "gorm.io/gorm"

type Project struct {
	gorm.Model
	Name  string `json:"name" form:"name"`
	Color string `json:"color" form:"color"`
}

type Projects []Project

type Task struct {
	gorm.Model
	Title       string  `json:"title" form:"title"`
	Description string  `json:"description" form:"description"`
	Status      string  `json:"status" form:"status"`
	Label       string  `json:"label" form:"label"`
	ProjectID   int     `json:"ProjectID" form:"ProjectID"`
	Project     Project `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type Tasks []Task
