package controllers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/services"
)

type Project struct {
	l *log.Logger
}

func NewProject(l *log.Logger) *Project {
	return &Project{l}
}

func (p Project) GetAllProjects(c echo.Context) error {
	p.l.Println("Get All Projects controller executing...")
	all, err := services.Project.GetAllProjects()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, all)
}

func (p Project) CreateProject(c echo.Context) error {
	p.l.Println("Create Project controller executing...")
	pdto := new(dto.Project)
	if err := c.Bind(pdto); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	if err := c.Validate(pdto); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	cp, err := services.Project.CreateProject(pdto)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusCreated, cp)
}

// G
func (p Project) GetProject(c echo.Context) error {
	p.l.Println("Get Project controller executing...")
	id, _ := strconv.Atoi(c.Param("id"))
	pr, err := services.Project.GetProject(id)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, pr)
}

func (p Project) UpdateProject(c echo.Context) error {
	p.l.Println("Update Project controller executing...")
	pdto := new(dto.Project)
	id, _ := strconv.Atoi(c.Param("id"))

	if err := c.Bind(pdto); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	up, err := services.Project.UpdateProject(id, pdto)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, up)
}

func (p Project) DeleteProject(c echo.Context) error {
	p.l.Println("Delete Project controller executing...")
	id, _ := strconv.Atoi(c.Param("id"))
	dp, err := services.Project.DeleteProject(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, dp)
}

func (p Project) AssignTaskToProject(c echo.Context) error {
	p.l.Println("Assign Task to project controller executing...")
	pid, _ := strconv.Atoi(c.Param("projectId"))
	tid, _ := strconv.Atoi(c.Param("taskId"))

	message, err := services.Project.AssignTaskToProject(tid, pid)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.String(http.StatusOK, message)

}

func (p Project) GetAllTasksInProject(c echo.Context) error {
	p.l.Println("Get all tasks in project controller executing...")
	pid, _ := strconv.Atoi(c.Param("projectId"))

	message, err := services.Project.GetAllTasksInProject(pid)

	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, message)

}
