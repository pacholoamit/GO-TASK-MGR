package task

import (
	"net/http"

	"github.com/pacholoamit/GO-TASK-MGR/common/log"

	"github.com/labstack/echo/v4"
)

func RegisterHandlers(r *echo.Echo, s Service, l log.Logger) {
	res := resource{s, l}

	// PUBLIC ROUTES
	r.GET("/tasks", res.list)
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
