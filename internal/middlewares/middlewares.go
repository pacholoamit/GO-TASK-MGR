package middlewares

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

// Validates the `/route/:id` parameter if a number is provided
var DynamicParams = []string{"id"}

func ValidateDynamicParamIds(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		for _, id := range DynamicParams {
			id = c.Param(id)
			if id != "" {
				if _, err := strconv.Atoi(id); err != nil {
					return echo.NewHTTPError(http.StatusBadRequest, "You have provided an Invalid id")
				}
			}
		}

		return next(c)
	}
}
