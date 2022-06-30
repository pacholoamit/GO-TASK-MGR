package dto

import "time"

type Task struct {
	ID          uint
	Title       string `json:"title" form:"title" validate:"required"`
	Description string `json:"description" form:"description" validate:"required"`
	Status      string `json:"status" form:"status"`
	Label       string `json:"label" form:"label"`
	ProjectID   uint
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type Tasks []Task
