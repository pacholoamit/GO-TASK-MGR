package project

import (
	"errors"

	"github.com/pacholoamit/GO-TASK-MGR/common/log"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
)

type Service interface {
	List() ([]dto.Project, error)
	Get(id int) (dto.Project, error)
	Create(t *dto.Project) (*dto.Project, error)
	Update(id int, t *dto.Project) (*dto.Project, error)
	Delete(id int) (dto.Project, error)
	GetTasks(id int) ([]dto.Task, error)
}

type service struct {
	repo   Repository
	logger log.Logger
}

func NewService(r Repository, l log.Logger) Service {
	return &service{
		repo:   r,
		logger: l,
	}
}

func (s *service) List() ([]dto.Project, error) {
	projects, err := s.repo.List()
	if err != nil {
		s.logger.Error("Error when Getting all projects:", err)
		return []dto.Project{}, err
	}
	return projects, nil
}

func (s *service) Get(id int) (dto.Project, error) {
	project, err := s.repo.Get(id)
	if project.ID == 0 {
		s.logger.Error("Error when Updating project:", err)
		return project, errors.New("project not found")
	}
	if err != nil {
		s.logger.Error("Error when Getting project:", err)
		return project, err
	}
	return project, nil
}

func (s *service) Create(t *dto.Project) (*dto.Project, error) {
	project, err := s.repo.Create(t)
	if err != nil {
		s.logger.Error("Error when Creating project:", err)
		return project, err
	}
	return project, nil
}

func (s *service) Update(id int, t *dto.Project) (*dto.Project, error) {
	project, err := s.repo.Update(id, t)
	if err != nil {
		s.logger.Error("Error when Updating a project:", err)
		return &dto.Project{}, err
	}
	if project.ID == 0 {
		s.logger.Error("Error when Updating project:", err)
		return &dto.Project{}, errors.New("project not found")
	}

	return project, nil
}

func (s *service) Delete(id int) (dto.Project, error) {
	project, err := s.repo.Delete(id)
	if project.ID == 0 {
		s.logger.Error("Error when Deleting project:", err)
		return dto.Project{}, errors.New("project not found")
	}
	if err != nil {
		s.logger.Error("Error when Deleting project:", err)
		return dto.Project{}, err
	}
	return project, nil
}

func (s *service) GetTasks(id int) ([]dto.Task, error) {
	tasks, err := s.repo.GetTasks(id)
	if err != nil {
		s.logger.Error("Error when Getting tasks:", err)
		return []dto.Task{}, err
	}
	return tasks, nil
}
