package dto

type Task struct {
	Title       string `json:"title" form:"title" validate:"required"`
	Description string `json:"description" form:"description" validate:"required"`
	Status      string `json:"status" form:"status"`
	Label       string `json:"label" form:"label"`
	ProjectID   int
}
