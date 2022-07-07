package task

import (
	"github.com/pacholoamit/GO-TASK-MGR/common/log"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
)

type Service interface {
	List() ([]dto.Task, error)
}

type service struct {
	repo   Repository
	logger log.Logger
}

func NewService(repo Repository, logger log.Logger) Service {
	return &service{
		repo:   repo,
		logger: logger,
	}
}

func (s *service) List() ([]dto.Task, error) {
	tasks, err := s.repo.List()
	if err != nil {
		s.logger.Error("Error when Getting all tasks:", err)
		return []dto.Task{}, err
	}
	return tasks, nil
}
