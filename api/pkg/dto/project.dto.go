package dto

import "time"

type Project struct {
	ID          uint
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Name        string `json:"name" validate:"required"`
	Description string `json:"description"`
}

type Projects []Project
