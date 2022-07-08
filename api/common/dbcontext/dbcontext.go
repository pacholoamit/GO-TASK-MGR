package dbcontext

import (
	"errors"

	"gorm.io/gorm"
)

type DBContext interface {
	ValidateIfExists(model interface{}, id int, name string) error
}

type dbcontexts struct {
	db *gorm.DB
}

func NewDbContext(db *gorm.DB) *dbcontexts {
	return &dbcontexts{db}
}

func (d *dbcontexts) ValidateIfExists(model interface{}, id int, name string) error {
	var exists bool
	err := d.db.Model(model).
		Select("count(*) > 0").
		Where("id = ?", id).
		Find(&exists).
		Error

	if !exists || err != nil {
		return errors.New(name + " not found")
	}
	return nil

}
