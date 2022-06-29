package repositories

import (
	"fmt"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"gorm.io/gorm/clause"
)

type project struct{}

var Project project

func (project) CreateProject(p *models.Project) (*models.Project, error) {
	if err := db.Create(&p).Error; err != nil {
		return p, err
	}
	return p, nil
}

func (project) GetAllProjects() (*models.Projects, error) {
	var projectsModel *models.Projects
	if err := db.Find(&projectsModel).Error; err != nil {
		return projectsModel, err
	}
	return projectsModel, nil
}

func (project) GetProject(id int) (*models.Project, error) {
	var projectModel *models.Project
	if err := db.Find(&projectModel, id).Error; err != nil {
		fmt.Println("Error:", err)
		return projectModel, err
	}
	return projectModel, nil
}

func (project) UpdateProject(id int, p *models.Project) (*models.Project, error) {
	var projectModel *models.Project
	if err := db.Clauses(clause.Returning{}).Find(&projectModel, id).Updates(p).Error; err != nil {
		return projectModel, err
	}

	return projectModel, nil
}

func (project) DeleteProject(id int) (*models.Project, error) {
	var projectsModel *models.Project
	if err := db.Clauses(clause.Returning{}).Delete(&projectsModel, id).Error; err != nil {
		return projectsModel, err
	}
	return projectsModel, nil
}

func (project) AssignTaskToProject(taskId int, projectId int) (string, error) {
	var taskModel models.Task
	var projectModel models.Project

	if err := db.Clauses(clause.Returning{}).Find(&taskModel, taskId).Error; err != nil {
		return "", err
	}

	if err := db.Clauses(clause.Returning{}).Find(&projectModel, projectId).Error; err != nil {
		return "", err
	}

	db.Model(&projectModel).Association("Tasks").Append(&taskModel)

	return fmt.Sprintf("Successfully assigned task %v to project %v", taskId, projectId), nil
}

func (project) GetAllTasksInProject(projectId int) (*models.Tasks, error) {
	var tasksModel models.Tasks
	var projectModel models.Project

	if err := db.Clauses(clause.Returning{}).Find(&projectModel, projectId).Error; err != nil {
		return &tasksModel, err
	}

	if err := db.Clauses(clause.Returning{}).Model(&projectModel).Association("Tasks").Find(&tasksModel); err != nil {
		return &tasksModel, err
	}
	return &tasksModel, nil
}
