package services

import (
	"errors"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/repositories"
)

type project struct{}

var Project project

func (project) GetAllProjects() (*models.Project, error) {
	ap, err := repositories.Project.GetAllProjects()
	if err != nil {
		return ap, err
	}
	return ap, nil
}

func (project) CreateProject(t *models.Project) (*models.Project, error) {
	cp, err := repositories.Project.CreateProject(t)
	if err != nil {
		return cp, err
	}

	return cp, nil
}

func (project) GetProject(id int) (*models.Project, error) {
	gp, err := repositories.Project.GetProject(id)
	if (gp.ID == 0) || (err != nil) {
		return gp, errors.New("Project does not exist")
	}
	return gp, nil
}

func (project) UpdateProject(id int, t *models.Project) (*models.Project, error) {
	up, err := repositories.Project.UpdateProject(id, t)
	if (up.ID == 0) || (err != nil) {
		return up, errors.New("Project does not exist")
	}
	return up, nil
}

func (project) DeleteProject(id int) (*models.Project, error) {
	dp, err := repositories.Project.DeleteProject(id)
	if (dp.ID == 0) || (err != nil) {
		return dp, errors.New("Project does not exist")
	}
	return dp, nil
}
