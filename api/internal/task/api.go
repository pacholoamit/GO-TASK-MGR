package task

import (
	"net/http"
	"strconv"

	"github.com/pacholoamit/GO-TASK-MGR/common/log"
	"github.com/pacholoamit/GO-TASK-MGR/pkg/dto"

	"github.com/labstack/echo/v4"
)

func RegisterHandlers(r *echo.Echo, s Service, l log.Logger) {
	res := resource{s, l}

	r.GET("/tasks", res.list)
	r.POST("/task", res.create)
	r.GET("/task/:id", res.get)
	r.PUT("/task/:id", res.update)
	r.DELETE("/task/:id", res.delete)
}

type resource struct {
	service Service
	logger  log.Logger
}

func (r resource) list(c echo.Context) error {
	r.logger.Info("Listing all tasks")
	tasks, err := r.service.List()
	if err != nil {
		r.logger.Error("Error when Getting all tasks:", err)
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, tasks)
}

func (r resource) get(c echo.Context) error {
	r.logger.Info("Getting a task")
	id, _ := strconv.Atoi(c.Param("id"))

	task, err := r.service.Get(id)
	if err != nil {
		r.logger.Error("Error when Getting task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, task)
}

func (r resource) create(c echo.Context) error {
	r.logger.Info("Creating a task")
	task := new(dto.Task)
	if err := c.Bind(task); err != nil {
		r.logger.Error("Error when Binding task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	if err := c.Validate(task); err != nil {
		r.logger.Error("Error when Validating task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	createdTask, err := r.service.Create(task)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusCreated, createdTask)
}

func (r resource) update(c echo.Context) error {
	r.logger.Info("Updating a task")
	id, _ := strconv.Atoi(c.Param("id"))
	task := new(dto.Task)

	if err := c.Bind(task); err != nil {
		r.logger.Error("Error when Binding task:", err)
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	updatedTask, err := r.service.Update(id, task)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, updatedTask)
}

func (r resource) delete(c echo.Context) error {
	r.logger.Info("Deleting a task")
	id, _ := strconv.Atoi(c.Param("id"))

	deletedTask, err := r.service.Delete(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, deletedTask)
}
