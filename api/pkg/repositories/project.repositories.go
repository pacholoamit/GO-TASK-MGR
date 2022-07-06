package repositories

import (
	"errors"
	"fmt"
	"log"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"gorm.io/gorm/clause"
)

type Project struct {
	l *log.Logger
}

func NewProject(l *log.Logger) *Project {
	return &Project{l}
}

func (p Project) CreateProject(pdto *dto.Project) (*dto.Project, error) {
	if err := db.Create(&pdto).Error; err != nil {
		return nil, err
	}
	return pdto, nil
}

func (p Project) GetAllProjects() (*dto.Projects, error) {
	dps := &dto.Projects{}
	if err := db.Find(&dps).Error; err != nil {
		return nil, err
	}
	return dps, nil
}

func (p Project) GetProject(id int) (*dto.Project, error) {
	dp := &dto.Project{}
	if err := db.Find(&dp, id).Error; err != nil {
		fmt.Println("Error:", err)
		return nil, err
	}
	return dp, nil
}

func (p Project) UpdateProject(id int, pdto *dto.Project) (*dto.Project, error) {
	dp := &dto.Project{}
	if err := db.Clauses(clause.Returning{}).Find(&dp, id).Updates(pdto).Error; err != nil {
		return nil, err
	}

	return dp, nil
}

func (p Project) DeleteProject(id int) (*dto.Project, error) {
	dp := &dto.Project{}
	if err := db.Clauses(clause.Returning{}).Delete(&dp, id).Error; err != nil {
		return nil, err
	}
	return dp, nil
}

func (p Project) AssignTaskToProject(taskId int, projectId int) (string, error) {
	dt := &dto.Task{}
	dp := &dto.Project{}

	if err := db.Clauses(clause.Returning{}).Find(&dt, taskId).Error; err != nil {
		return "", err
	}

	if dt.ID == 0 {
		return "", errors.New("task ID not found")
	}

	if err := db.Clauses(clause.Returning{}).Find(&dp, projectId).Error; err != nil {
		return "", err
	}

	if dp.ID == 0 {
		return "", errors.New("project ID not found")
	}

	db.Model(&dp).Association("Tasks").Append(&dt)

	return fmt.Sprintf("Successfully assigned task %v to project %v", taskId, projectId), nil
}

func (p Project) GetAllTasksInProject(projectId int) (*models.Tasks, error) {

	dts := &models.Tasks{}
	dp := &models.Project{}

	if err := db.Clauses(clause.Returning{}).Find(&dp, projectId).Error; err != nil {
		return dts, err
	}

	if err := db.Clauses(clause.Returning{}).Model(&dp).Association("Tasks").Find(&dts); err != nil {
		return dts, err
	}
	return dts, nil
}
