package dto

type Project struct {
	Name  string `json:"name" form:"name"`
	Color string `json:"color" form:"color"`
}
