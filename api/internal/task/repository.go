package task

import (
	"github.com/pacholoamit/GO-TASK-MGR/common/log"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
	"gorm.io/gorm"
)

type Repository interface {
	List() ([]dto.Task, error)
}

type repository struct {
	db     *gorm.DB
	logger log.Logger
}

func NewRepository(db *gorm.DB, logger log.Logger) Repository {
	return repository{db, logger}
}

func (r repository) List() ([]dto.Task, error) {
	tasks := []dto.Task{}
	if err := r.db.Find(&tasks).Error; err != nil {
		r.logger.Error("Error when Getting all tasks:", err)
		return []dto.Task{}, err
	}
	return tasks, nil
}
