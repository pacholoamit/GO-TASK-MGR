package services

import (
	"fmt"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/repositories"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/utils"
)

type project struct{}

var (
	Project            project
	projectNonExistErr = utils.NonExistentError("project")
)

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

	if project.ID == 0 {
		fmt.Println("Error when Getting a project:", projectNonExistErr)
		return project, projectNonExistErr
	}
	if err != nil {
		fmt.Println("Error when Getting a project:", err)
		return project, err
	}

	return project, nil
}

func (project) UpdateProject(id int, t *models.Project) (*models.Project, error) {
	updatedProject, err := repositories.Project.UpdateProject(id, t)

	if updatedProject.ID == 0 {
		fmt.Println("Error when Updating a project:", err)
		return updatedProject, projectNonExistErr
	}
	if err != nil {
		fmt.Println("Error when Updating a project:", err)
		return updatedProject, err
	}
	return updatedProject, nil
}

func (project) DeleteProject(id int) (*models.Project, error) {
	deletedProject, err := repositories.Project.DeleteProject(id)

	if deletedProject.ID == 0 {
		fmt.Println("Error when Deleting a project:", err)
		return deletedProject, projectNonExistErr
	}
	if err != nil {
		fmt.Println("Error when Deleting a project:", err)
		return deletedProject, err
	}
	return deletedProject, nil
}

func (project) AssignTaskToProject(taskId int, projectId int) (string, error) {

	message, err := repositories.Project.AssignTaskToProject(taskId, projectId)
	if err != nil {
		fmt.Println("Error when Deleting a project:", err)
		return "", err
	}
	return message, nil

}