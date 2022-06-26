package repositories

import (
	"github.com/pacholoamit/GO-TASK-MGR/pkg/models"
	"gorm.io/gorm/clause"
)

type project struct{}

var (
	Project project
)

func (project) CreateProject(p *models.Project) (*models.Project, error) {
	if err := db.Create(&p).Error; err != nil {
		return p, err
	}
	return p, nil
}

func (project) GetAllProjects() (*models.Projects, error) {
	var mps *models.Projects
	if err := db.Find(&mps).Error; err != nil {
		return mps, err
	}
	return mps, nil
}

func (project) GetProject(id int) (*models.Project, error) {
	var mp *models.Project
	if err := db.Find(&mp, id).Error; err != nil {
		return mp, err
	}
	return mp, nil
}

func (project) UpdateProject(id int, p *models.Project) (*models.Project, error) {
	var mp *models.Project
	if err := db.Clauses(clause.Returning{}).Find(&mp, id).Updates(p).Error; err != nil {
		return mp, err
	}

	return mp, nil
}

func (project) DeleteProject(id int) (*models.Project, error) {
	var mp *models.Project
	if err := db.Clauses(clause.Returning{}).Delete(&mp, id).Error; err != nil {
		return mp, err
	}
	return mp, nil
}
