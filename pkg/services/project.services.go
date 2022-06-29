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
	projects, err := repositories.Project.GetAllProjects()
	if err != nil {
		fmt.Println("Error when Getting all projects:", err)
		return projects, err
	}
	return projects, nil
}

func (project) CreateProject(t *models.Project) (*models.Project, error) {
	createdProject, err := repositories.Project.CreateProject(t)
	if err != nil {
		fmt.Println("Error when Creating a project:", err)
		return createdProject, err
	}

	return createdProject, nil
}

func (project) GetProject(id int) (*models.Project, error) {
	project, err := repositories.Project.GetProject(id)

	if (project.ID == 0) || (err != nil) {
		fmt.Println("Error when Getting a project:", err)
		return project, errors.New("project does not exist")
	}

	return project, nil
}

func (project) UpdateProject(id int, t *models.Project) (*models.Project, error) {
	updatedProject, err := repositories.Project.UpdateProject(id, t)
	if (updatedProject.ID == 0) || (err != nil) {
		fmt.Println("Error when Updating a project:", err)
		return updatedProject, errors.New("project does not exist")
	}
	return updatedProject, nil
}

func (project) DeleteProject(id int) (*models.Project, error) {
	deletedProject, err := repositories.Project.DeleteProject(id)
	if (deletedProject.ID == 0) || (err != nil) {
		fmt.Println("Error when Deleting a project:", err)
		return deletedProject, errors.New("project does not exist")
	}
	return deletedProject, nil
}
