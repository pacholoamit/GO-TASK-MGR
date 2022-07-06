package controllers

import (
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"

	"github.com/pacholoamit/GO-TASK-MGR/pkg/services"
)

var (
	psvcLogger = log.New(os.Stdout, "projects-service: ", log.LstdFlags)
	psvc       = services.NewProject(psvcLogger)
)

type Project struct {
	l *log.Logger
}

func NewProject(l *log.Logger) *Project {
	return &Project{l}
}

func (p Project) GetAllProjects(c echo.Context) error {
	p.l.Println("GetAllProjects controller executing...")

	all, err := psvc.GetAllProjects()
	if err != nil {
		p.l.Println("Error in GetAllProjects controller", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, all)
}

func (p Project) CreateProject(c echo.Context) error {
	p.l.Println("CreateProject controller executing...")
	pdto := new(dto.Project)

	if err := c.Bind(pdto); err != nil {
		p.l.Println("Error in CreateProject controller", err)
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	if err := c.Validate(pdto); err != nil {
		p.l.Println("Error in CreateProject controller", err)
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	cp, err := psvc.CreateProject(pdto)
	if err != nil {
		p.l.Println("Error in CreateProject controller", err)
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusCreated, cp)
}

// G
func (p Project) GetProject(c echo.Context) error {
	p.l.Println("GetProject controller executing...")
	id, _ := strconv.Atoi(c.Param("id"))
	proj, err := psvc.GetProject(id)

	if err != nil {
		p.l.Println("Error in GetProject controller", err)
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, proj)
}

func (p Project) UpdateProject(c echo.Context) error {
	p.l.Println("UpdateProject controller executing...")
	pdto := new(dto.Project)
	id, _ := strconv.Atoi(c.Param("id"))

	if err := c.Bind(pdto); err != nil {
		p.l.Println("Error in UpdateProject controller", err)
		return c.JSON(http.StatusBadRequest, err)
	}

	up, err := psvc.UpdateProject(id, pdto)

	if err != nil {
		p.l.Println("Error in UpdateProject controller", err)
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, up)
}

func (p Project) DeleteProject(c echo.Context) error {
	p.l.Println("DeleteProject controller executing...")
	id, _ := strconv.Atoi(c.Param("id"))
	dp, err := psvc.DeleteProject(id)
	if err != nil {
		p.l.Println("Error in DeleteProject controller", err)
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, dp)
}

func (p Project) AssignTaskToProject(c echo.Context) error {
	p.l.Println("AssignTaskToProject controller executing...")
	pid, _ := strconv.Atoi(c.Param("projectId"))
	tid, _ := strconv.Atoi(c.Param("taskId"))

	m, err := psvc.AssignTaskToProject(tid, pid)

	if err != nil {
		p.l.Println("Error in AssignTaskToProject controller", err)
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, m)

}

func (p Project) GetAllTasksInProject(c echo.Context) error {
	p.l.Println("GetAllTasksInProject controller executing...")
	pid, _ := strconv.Atoi(c.Param("projectId"))

	m, err := psvc.GetAllTasksInProject(pid)

	if err != nil {
		p.l.Println("Error in GetAllTasksInProject controller", err)
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, m)

}
