package project

import (
	"github.com/pacholoamit/GO-TASK-MGR/common/log"
	"github.com/pacholoamit/GO-TASK-MGR/internal/dto"
	"github.com/pacholoamit/GO-TASK-MGR/internal/models"
	"gorm.io/gorm"
)

type Repository interface {
	List() ([]dto.Project, error)
	Get(id int) (dto.Project, error)
	Create(t *dto.Project) (*dto.Project, error)
	Update(id int, t *dto.Project) (*dto.Project, error)
	Delete(id int) (dto.Project, error)
	GetTasks(id int) (models.Project, error)
}

type repository struct {
	db     *gorm.DB
	logger log.Logger
}

func NewRepository(db *gorm.DB, l log.Logger) Repository {
	return repository{db, l}
}

func (r repository) List() ([]dto.Project, error) {
	projects := []dto.Project{}
	if err := r.db.Find(&projects).Error; err != nil {
		return []dto.Project{}, err
	}
	return projects, nil
}

func (r repository) Get(id int) (dto.Project, error) {
	project := dto.Project{}
	if err := r.db.First(&project, id).Error; err != nil {
		return dto.Project{}, err
	}
	return project, nil
}

func (r repository) Create(t *dto.Project) (*dto.Project, error) {
	if err := r.db.Create(&t).Error; err != nil {
		return new(dto.Project), err
	}
	return t, nil
}

func (r repository) Update(id int, t *dto.Project) (*dto.Project, error) {
	project := new(dto.Project)
	if err := r.db.Find(&project, id).Updates(&t).Error; err != nil {
		return new(dto.Project), err
	}
	return project, nil
}

func (r repository) Delete(id int) (dto.Project, error) {
	project := dto.Project{}
	if err := r.db.First(&project, id).Delete(&project).Error; err != nil {
		return dto.Project{}, err
	}
	return project, nil
}

func (r repository) GetTasks(id int) (models.Project, error) {
	project := models.Project{}
	tasks := []models.Task{}
	if err := r.db.Find(&project, id).Error; err != nil {
		return project, err
	}

	if err := r.db.Model(&project).Association("Tasks").Find(&tasks); err != nil {
		return project, err
	}
	project.Tasks = tasks

	return project, nil
}
