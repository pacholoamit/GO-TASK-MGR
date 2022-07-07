package project

import (
	"github.com/pacholoamit/GO-TASK-MGR/common/log"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
	"gorm.io/gorm"
)

type Repository interface {
	List() ([]dto.Project, error)
	Get(id int) (dto.Project, error)
	Create(t *dto.Project) (*dto.Project, error)
	Update(id int, t *dto.Project) (*dto.Project, error)
	Delete(id int) (dto.Project, error)
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
		r.logger.Error("Error when Getting all projects:", err)
		return []dto.Project{}, err
	}
	return projects, nil
}

func (r repository) Get(id int) (dto.Project, error) {
	project := dto.Project{}
	if err := r.db.First(&project, id).Error; err != nil {
		r.logger.Error("Error when Getting project:", err)
		return dto.Project{}, err
	}
	return project, nil
}

func (r repository) Create(t *dto.Project) (*dto.Project, error) {
	if err := r.db.Create(&t).Error; err != nil {
		r.logger.Error("Error when Creating project:", err)
		return new(dto.Project), err
	}
	return t, nil
}

func (r repository) Update(id int, t *dto.Project) (*dto.Project, error) {
	project := new(dto.Project)

	if err := r.db.Find(&project, id).Updates(&t).Error; err != nil {
		r.logger.Error("Error when Updating project:", err)
		return new(dto.Project), err
	}
	return project, nil
}

func (r repository) Delete(id int) (dto.Project, error) {
	project := dto.Project{}
	if err := r.db.First(&project, id).Delete(&project).Error; err != nil {
		r.logger.Error("Error when Deleting project:", err)
		return dto.Project{}, err
	}
	return project, nil
}
