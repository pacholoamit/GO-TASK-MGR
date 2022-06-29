package dto

import "time"

type Project struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time
	Name      string `json:"name" form:"name"`
	Color     string `json:"color" form:"color"`
}
