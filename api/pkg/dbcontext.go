package dbcontext

import "gorm.io/gorm"

type DBContext interface {
	ValidateIfExists(args ...interface{}) error
}

type dbcontext struct {
	db *gorm.DB
}

func NewDbContext(db *gorm.DB) *dbcontext {
	return &dbcontext{db}
}

func (d *dbcontext) ValidateIfExists(args ...interface{}) error {
	if err := d.db.First(args).Error; err != nil {
		return err
	}
	return nil
}
