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
	p.l.Println("CreateProject repository is executing...")
	if err := db.Create(&pdto).Error; err != nil {
		p.l.Println("Error in CreateProject repository: ", err)
		return nil, err
	}
	return pdto, nil
}

func (p Project) GetAllProjects() (*dto.Projects, error) {
	p.l.Println("GetAllProjects repository is executing...")
	dps := &dto.Projects{}
	if err := db.Find(&dps).Error; err != nil {
		p.l.Println("Error in GetAllProjects repository: ", err)
		return nil, err
	}
	return dps, nil
}

func (p Project) GetProject(id int) (*dto.Project, error) {
	p.l.Println("GetProject repository is executing...")
	dp := &dto.Project{}
	if err := db.Find(&dp, id).Error; err != nil {
		p.l.Println("Error in GetProject repository: ", err)
		return nil, err
	}
	return dp, nil
}

func (p Project) UpdateProject(id int, pdto *dto.Project) (*dto.Project, error) {
	p.l.Println("UpdateProject repository is executing...")
	dp := &dto.Project{}
	if err := db.Clauses(clause.Returning{}).Find(&dp, id).Updates(pdto).Error; err != nil {
		p.l.Println("Error in UpdateProject repository: ", err)
		return nil, err
	}

	return dp, nil
}

func (p Project) DeleteProject(id int) (*dto.Project, error) {
	p.l.Println("DeleteProject repository is executing...")
	dp := &dto.Project{}
	if err := db.Clauses(clause.Returning{}).Delete(&dp, id).Error; err != nil {
		p.l.Println("Error in DeleteProject repository: ", err)
		return nil, err
	}
	return dp, nil
}

func (p Project) AssignTaskToProject(taskId int, projectId int) (string, error) {
	p.l.Println("AssignTaskToProject repository is executing...")
	dt := &dto.Task{}
	dp := &dto.Project{}

	if err := db.Clauses(clause.Returning{}).Find(&dt, taskId).Error; err != nil {
		p.l.Println("Error in AssignTaskToProject repository: ", err)
		return "", err
	}

	if dt.ID == 0 {
		p.l.Println("Task not found")
		return "", errors.New("task ID not found")
	}

	if err := db.Clauses(clause.Returning{}).Find(&dp, projectId).Error; err != nil {
		p.l.Println("Error in AssignTaskToProject repository: ", err)
		return "", err
	}

	if dp.ID == 0 {
		p.l.Println("Project not found")
		return "", errors.New("project ID not found")
	}

	db.Model(&dp).Association("Tasks").Append(&dt)

	return fmt.Sprintf("Successfully assigned task %v to project %v", taskId, projectId), nil
}

func (p Project) GetAllTasksInProject(projectId int) (*models.Tasks, error) {
	p.l.Println("GetAllTasksInProject repository is executing...")
	dts := &models.Tasks{}
	dp := &models.Project{}

	if err := db.Clauses(clause.Returning{}).Find(&dp, projectId).Error; err != nil {
		p.l.Println("Error in GetAllTasksInProject repository: ", err)
		return nil, err
	}

	if err := db.Clauses(clause.Returning{}).Model(&dp).Association("Tasks").Find(&dts); err != nil {
		p.l.Println("Error in GetAllTasksInProject repository: ", err)
		return nil, err
	}
	return dts, nil
}
