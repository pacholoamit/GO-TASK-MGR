package dto

import (
	"time"
)

type Project struct {
	ID          uint
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Name        string `json:"name" form:"name" validate:"required"`
	Description string `json:"description" form:"description"`
}

//TODO: Remove this later
type Projects []Project
