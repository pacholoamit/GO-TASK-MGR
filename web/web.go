package web

import (
	"embed"

	"github.com/labstack/echo/v4"
)

//go:embed all:dist
var dist embed.FS

//go:embed dist/index.html
var indexHTML embed.FS

var DistDirFS = echo.MustSubFS(dist, "dist")

var DistIndexHtml = echo.MustSubFS(indexHTML, "dist")
