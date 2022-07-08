package models

import "gorm.io/gorm"

type Project struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Tasks       Tasks  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:ProjectID"`
}

type Projects []Project

type Task struct {
	gorm.Model
	Title       string `json:"title" form:"title"`
	Description string `json:"description" form:"description"`
	Status      string `json:"status" form:"status"`
	Label       string `json:"label" form:"label"`
	ProjectID   uint
}

type Tasks []Task
