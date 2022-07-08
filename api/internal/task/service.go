package task

import (
	"errors"

	"github.com/pacholoamit/GO-TASK-MGR/common/log"

	"github.com/pacholoamit/GO-TASK-MGR/internal/dto"
)

type Service interface {
	List() ([]dto.Task, error)
	Get(id int) (dto.Task, error)
	Create(t *dto.Task) (*dto.Task, error)
	Update(id int, t *dto.Task) (*dto.Task, error)
	Delete(id int) (dto.Task, error)
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

func (s *service) List() ([]dto.Task, error) {
	tasks, err := s.repo.List()
	if err != nil {
		s.logger.Error("Error when Getting all tasks:", err)
		return tasks, err
	}
	return tasks, nil
}

func (s *service) Get(id int) (dto.Task, error) {
	task, err := s.repo.Get(id)
	if task.ID == 0 {
		s.logger.Error("Error when Updating task:", err)
		return task, errors.New("task not found")
	}
	if err != nil {
		s.logger.Error("Error when Getting task:", err)
		return task, err
	}
	return task, nil
}

func (s *service) Create(t *dto.Task) (*dto.Task, error) {
	task, err := s.repo.Create(t)
	if err != nil {
		s.logger.Error("Error when Creating task:", err)
		return task, err
	}
	return task, nil
}

func (s *service) Update(id int, t *dto.Task) (*dto.Task, error) {
	task, err := s.repo.Update(id, t)

	if err != nil && task.ID == 0 {
		s.logger.Error("Error when Updating task:", err)
		return task, errors.New("task not found, " + err.Error())
	}
	if err != nil {
		s.logger.Error("Error when Updating task:", err)
		return task, err
	}
	if task.ID == 0 {
		s.logger.Info("Error when Updating task:", err)
		return task, errors.New("task not found")
	}

	return task, nil
}

func (s *service) Delete(id int) (dto.Task, error) {
	task, err := s.repo.Delete(id)
	if task.ID == 0 {
		s.logger.Info("Error when Updating task:", err)
		return task, errors.New("task not found")
	}
	if err != nil {
		s.logger.Error("Error when Deleting task:", err)
		return task, err
	}
	return task, nil
}
