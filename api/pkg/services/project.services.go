package services

import (
	"fmt"
	"log"
	"os"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/repositories"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/utils"
)

type Project struct {
	l *log.Logger
}

var (
	projectNonExistErr = utils.NonExistentError("project")
	pRepoLogger        = log.New(os.Stdout, "projects-repository", log.LstdFlags)
	pRepo              = repositories.NewProject(pRepoLogger)
)

func NewProject(l *log.Logger) *Project {
	return &Project{l}
}

func (p Project) GetAllProjects() (*dto.Projects, error) {
	p.l.Println("GetAllProjects service executing...")
	all, err := pRepo.GetAllProjects()
	if err != nil {
		fmt.Println("Error when Getting all projects:", err)
		return all, err
	}
	return all, nil
}

func (p Project) CreateProject(t *dto.Project) (*dto.Project, error) {
	p.l.Println("CreateProject service executing...")
	cp, err := pRepo.CreateProject(t)
	if err != nil {
		fmt.Println("Error when Creating a project:", err)
		return cp, err
	}

	return cp, nil
}

func (p Project) GetProject(id int) (*dto.Project, error) {
	p.l.Println("GetProject service executing...")
	proj, err := pRepo.GetProject(id)

	if proj.ID == 0 {
		fmt.Println("Error when Getting a project:", projectNonExistErr)
		return nil, projectNonExistErr
	}
	if err != nil {
		fmt.Println("Error when Getting a project:", err)
		return nil, err
	}

	return proj, nil
}

func (p Project) UpdateProject(id int, t *dto.Project) (*dto.Project, error) {
	p.l.Println("UpdateProject service executing...")
	up, err := pRepo.UpdateProject(id, t)

	if up.ID == 0 {
		fmt.Println("Error when Updating a project:", err)
		return up, projectNonExistErr
	}
	if err != nil {
		fmt.Println("Error when Updating a project:", err)
		return up, err
	}
	return up, nil
}

func (p Project) DeleteProject(id int) (*dto.Project, error) {
	p.l.Println("DeleteProject service executing...")
	dp, err := pRepo.DeleteProject(id)

	if dp.ID == 0 {
		fmt.Println("Error when Deleting a project:", err)
		return dp, projectNonExistErr
	}
	if err != nil {
		fmt.Println("Error when Deleting a project:", err)
		return dp, err
	}
	return dp, nil
}

func (p Project) AssignTaskToProject(taskId int, projectId int) (string, error) {
	p.l.Println("AssignTaskToProject service executing...")
	m, err := pRepo.AssignTaskToProject(taskId, projectId)
	if err != nil {
		fmt.Println("Error when Assigning a task to a project:", err)
		return "", err
	}
	return m, nil

}

func (p Project) GetAllTasksInProject(projectId int) (*models.Tasks, error) {
	p.l.Println("GetAllTasksInProject service executing...")
	t, err := pRepo.GetAllTasksInProject(projectId)
	if err != nil {
		fmt.Println("Error when Getting all tasks from a project:", err)
		return t, err
	}
	return t, nil

}
