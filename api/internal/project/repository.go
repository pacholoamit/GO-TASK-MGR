package project

import (
	"github.com/pacholoamit/GO-TASK-MGR/common/dbcontext"
	"github.com/pacholoamit/GO-TASK-MGR/common/log"
	"github.com/pacholoamit/GO-TASK-MGR/internal/dto"
	"github.com/pacholoamit/GO-TASK-MGR/internal/models"
)

type Repository interface {
	List() ([]dto.Project, error)
	Get(id int) (dto.Project, error)
	Create(t *dto.Project) (*dto.Project, error)
	Update(id int, t *dto.Project) (*dto.Project, error)
	Delete(id int) (dto.Project, error)
	GetTasks(id int) (dto.ProjectWithTasks, error)
}

type repository struct {
	d      *dbcontext.DB
	logger log.Logger
}

func NewRepository(db *dbcontext.DB, l log.Logger) Repository {
	return repository{db, l}
}

func (r repository) List() ([]dto.Project, error) {
	projects := []dto.Project{}

	if err := r.d.DB().Find(&projects).Error; err != nil {
		return []dto.Project{}, err
	}
	return projects, nil
}

func (r repository) Get(id int) (dto.Project, error) {
	project := dto.Project{}
	if err := r.d.DB().First(&project, id).Error; err != nil {
		return dto.Project{}, err
	}
	return project, nil
}

func (r repository) Create(t *dto.Project) (*dto.Project, error) {
	if err := r.d.DB().Create(&t).Error; err != nil {
		return new(dto.Project), err
	}
	return t, nil
}

func (r repository) Update(id int, t *dto.Project) (*dto.Project, error) {
	project := new(dto.Project)
	if err := r.d.DB().Find(&project, id).Updates(&t).Error; err != nil {
		return new(dto.Project), err
	}
	return project, nil
}

func (r repository) Delete(id int) (dto.Project, error) {
	project := dto.Project{}
	if err := r.d.DB().First(&project, id).Delete(&project).Error; err != nil {
		return dto.Project{}, err
	}
	return project, nil
}

func (r repository) GetTasks(id int) (dto.ProjectWithTasks, error) {
	project := models.Project{}
	tasks := []dto.Task{}
	if err := r.d.DB().Find(&project, id).Error; err != nil {
		return dto.ProjectWithTasks{}, err
	}

	if err := r.d.DB().Model(&project).Association("Tasks").Find(&tasks); err != nil {
		return dto.ProjectWithTasks{}, err
	}

	projectWithTasks := dto.ProjectWithTasks{
		ID:          project.ID,
		Name:        project.Name,
		Description: project.Description,
		CreatedAt:   project.CreatedAt,
		UpdatedAt:   project.UpdatedAt,
		Tasks:       tasks,
	}

	return projectWithTasks, nil
}
