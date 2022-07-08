package dto

import (
	"time"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
)

type Project struct {
	ID          uint
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Name        string `json:"name" form:"name" validate:"required"`
	Description string `json:"description" form:"description"`
}

type ProjectWithTasks struct {
	models.Project
}

//TODO: Remove this later
type Projects []Project
