package dbcontext

import (
	"errors"

	"gorm.io/gorm"
)

// Database connection wrapped
type DB struct {
	db *gorm.DB
}

func New(db *gorm.DB) *DB {
	return &DB{db}
}

func (d *DB) ValidateIfExists(model interface{}, id int, name string) error {
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

// Returns wrapped database
func (d *DB) DB() *gorm.DB {
	return d.db
}
