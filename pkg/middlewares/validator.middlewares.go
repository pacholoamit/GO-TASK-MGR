package middlewares

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func ValidateQueryId(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		p := c.Param("id")
		_, err := strconv.Atoi(p)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "You have provided an invalid ID")
		}
		return next(c)
	}
}
