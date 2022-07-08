package project

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/common/log"
	"github.com/pacholoamit/GO-TASK-MGR/internal/dto"
)

func RegisterHandlers(r *echo.Echo, s Service, l log.Logger) {
	res := resource{s, l}

	r.GET("/projects", res.list)
	r.POST("/project", res.create)
	r.GET("/project/:id", res.get)
	r.PUT("/project/:id", res.update)
	r.DELETE("/project/:id", res.delete)
	r.GET("/project/:id/tasks", res.getTasks)
}

type resource struct {
	service Service
	logger  log.Logger
}

func (r resource) list(c echo.Context) error {
	r.logger.Info("Listing all projects")
	projects, err := r.service.List()
	if err != nil {
		r.logger.Error("Error when Getting all projects:", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, projects)
}

func (r resource) get(c echo.Context) error {
	r.logger.Info("Getting a project")
	id, _ := strconv.Atoi(c.Param("id"))
	project, err := r.service.Get(id)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, project)
}

func (r resource) create(c echo.Context) error {
	r.logger.Info("Creating a project")
	project := new(dto.Project)

	if err := c.Bind(project); err != nil {
		r.logger.Error("Error when Binding project:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	if err := c.Validate(project); err != nil {
		r.logger.Error("Error when Validating project:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	createdProject, err := r.service.Create(project)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, createdProject)
}

func (r resource) update(c echo.Context) error {
	r.logger.Info("Updating a project")
	id, _ := strconv.Atoi(c.Param("id"))
	project := new(dto.Project)

	if err := c.Bind(project); err != nil {
		r.logger.Error("Error when Binding project:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	updatedProject, err := r.service.Update(id, project)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, updatedProject)
}

func (r resource) delete(c echo.Context) error {
	r.logger.Info("Deleting a project")
	id, _ := strconv.Atoi(c.Param("id"))

	project, err := r.service.Delete(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, project)
}

func (r resource) getTasks(c echo.Context) error {
	r.logger.Info("Getting tasks of a project")
	id, _ := strconv.Atoi(c.Param("id"))
	project, err := r.service.GetTasks(id)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, project)
}
