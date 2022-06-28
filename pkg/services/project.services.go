package services

import (
	"errors"
	"fmt"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/repositories"
)

type project struct{}

var Project project

func (project) GetAllProjects() (*models.Projects, error) {
	ap, err := repositories.Project.GetAllProjects()
	if err != nil {
		fmt.Println("Error when Getting all projects:", err)
		return ap, err
	}
	return ap, nil
}

func (project) CreateProject(t *models.Project) (*models.Project, error) {
	cp, err := repositories.Project.CreateProject(t)
	if err != nil {
		fmt.Println("Error when Creating a project:", err)
		return cp, err
	}

	return cp, nil
}

func (project) GetProject(id int) (*models.Project, error) {
	gp, err := repositories.Project.GetProject(id)
	if (gp.ID == 0) || (err != nil) {
		fmt.Println("Error when Getting a project:", err)
		return gp, errors.New("project does not exist")
	}

	return gp, nil
}

func (project) UpdateProject(id int, t *models.Project) (*models.Project, error) {
	up, err := repositories.Project.UpdateProject(id, t)
	if (up.ID == 0) || (err != nil) {
		fmt.Println("Error when Updating a project:", err)
		return up, errors.New("project does not exist")
	}
	return up, nil
}

func (project) DeleteProject(id int) (*models.Project, error) {
	dp, err := repositories.Project.DeleteProject(id)
	if (dp.ID == 0) || (err != nil) {
		fmt.Println("Error when Deleting a project:", err)
		return dp, errors.New("project does not exist")
	}
	return dp, nil
}
