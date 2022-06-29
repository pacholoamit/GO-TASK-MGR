package dto

import "time"

type Project struct {
	ID        uint
	CreatedAt time.Time
	UpdatedAt time.Time
	Name      string `json:"name" form:"name"`
	Color     string `json:"color" form:"color"`
}

type Projects []Project
