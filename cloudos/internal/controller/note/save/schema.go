package save

import (
	"cloudos/internal/controller"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	*controller.Controller
}

func NewController(ctx *gin.Context) *Controller {
	return &Controller{controller.New(ctx, new(Params))}
}

type Params struct {
	Id      int64    `json:"id"`
	Title   string   `json:"name"`
	Topic   string   `json:"topic"`
	Content string   `json:"content"`
	Labels  []string `json:"labels"`
}

type Reply struct{}
