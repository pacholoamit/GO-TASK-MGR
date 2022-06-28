package repositories

import (
	"github.com/pacholoamit/GO-TASK-MGR/pkg/lib"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"gorm.io/gorm"
)

var db *gorm.DB

// Initialize db in package
func init() {
	lib.Connect()
	db = lib.GetDB()
	db.AutoMigrate(&models.Task{}, &models.Project{})
}
