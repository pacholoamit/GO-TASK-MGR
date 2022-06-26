package lib

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func Connect() {
	d, err := gorm.Open(sqlite.Open("GO-TASK-MGR.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}

	db = d
}

func GetDB() *gorm.DB {
	return db
}
