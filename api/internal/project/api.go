package project

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pacholoamit/GO-TASK-MGR/common/log"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"
)

func RegisterHandlers(r *echo.Echo, s Service, l log.Logger) {
	res := resource{s, l}

	r.GET("/projects", res.list)
	r.POST("/project", res.create)
	r.GET("/project/:id", res.get)
	r.PUT("/project/:id", res.update)
	r.DELETE("/projects/:id", res.delete)
}

type resource struct {
	service Service
	logger  log.Logger
}

func (r resource) list(c echo.Context) error {
	r.logger.Info("Listing all tasks")
	projects, err := r.service.List()
	if err != nil {
		r.logger.Error("Error when Getting all tasks:", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, projects)
}

func (r resource) get(c echo.Context) error {
	r.logger.Info("Getting a task")
	id, _ := strconv.Atoi(c.Param("id"))
	project, err := r.service.Get(id)

	if err != nil {
		r.logger.Error("Error when Getting task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, project)
}

func (r resource) create(c echo.Context) error {
	r.logger.Info("Creating a task")
	project := new(dto.Project)

	if err := c.Bind(project); err != nil {
		r.logger.Error("Error when Binding task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	if err := c.Validate(project); err != nil {
		r.logger.Error("Error when Validating task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	createdProject, err := r.service.Create(project)
	if err != nil {
		r.logger.Error("Error when Creating task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, createdProject)
}

func (r resource) update(c echo.Context) error {
	r.logger.Info("Updating a task")
	id, _ := strconv.Atoi(c.Param("id"))
	project := new(dto.Project)

	if err := c.Bind(project); err != nil {
		r.logger.Error("Error when Binding task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	updatedProject, err := r.service.Update(id, project)
	if err != nil {
		r.logger.Error("Error when Updating task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, updatedProject)
}

func (r resource) delete(c echo.Context) error {
	r.logger.Info("Deleting a task")
	id, _ := strconv.Atoi(c.Param("id"))

	project, err := r.service.Delete(id)
	if err != nil {
		r.logger.Error("Error when Deleting task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, project)
}
