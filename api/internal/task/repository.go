package task

import (
	"errors"

	"github.com/pacholoamit/GO-TASK-MGR/common/log"
	"github.com/pacholoamit/GO-TASK-MGR/internal/dto"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Repository interface {
	List() ([]dto.Task, error)
	Get(id int) (dto.Task, error)
	Create(t *dto.Task) (*dto.Task, error)
	Update(id int, t *dto.Task) (*dto.Task, error)
	Delete(id int) (dto.Task, error)
}

type repository struct {
	db     *gorm.DB
	logger log.Logger
}

func NewRepository(db *gorm.DB, l log.Logger) Repository {
	return repository{db, l}
}

func (r repository) List() ([]dto.Task, error) {
	tasks := []dto.Task{}
	if err := r.db.Find(&tasks).Error; err != nil {
		return []dto.Task{}, err
	}
	return tasks, nil
}

func (r repository) Get(id int) (dto.Task, error) {
	task := dto.Task{}
	if err := r.db.First(&task, id).Error; err != nil {
		return dto.Task{}, err
	}
	return task, nil
}

func (r repository) Create(t *dto.Task) (*dto.Task, error) {
	project := new(dto.Project)
	// Validates if Project exists
	if t.ProjectID != 0 {
		r.db.Model(&project).Find(&project, t.ProjectID)
	}
	if t.ProjectID != 0 && project.ID == 0 {
		return new(dto.Task), errors.New("project not found")
	}

	if err := r.db.Create(&t).Error; err != nil {
		return new(dto.Task), err
	}
	return t, nil
}

func (r repository) Update(id int, t *dto.Task) (*dto.Task, error) {
	task := new(dto.Task)
	project := new(dto.Project)

	// Validates if Project exists
	if t.ProjectID != 0 {
		r.db.Model(&project).Find(&project, t.ProjectID)
	}

	if t.ProjectID != 0 && project.ID == 0 {
		return new(dto.Task), errors.New("project not found")
	}

	if err := r.db.Find(&task, id).Updates(&t).Error; err != nil {
		return new(dto.Task), err
	}

	return task, nil
}

func (r repository) Delete(id int) (dto.Task, error) {
	task := dto.Task{}
	if err := r.db.Clauses(clause.Returning{}).Where("id = ?", id).Delete(&task).Error; err != nil {
		return dto.Task{}, err
	}
	return task, nil
}
