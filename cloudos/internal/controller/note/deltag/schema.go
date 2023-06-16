package deltag

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
	NoteId   int64   `json:"noteId"`
	LabelIds []int64 `json:"labelIds"`
}

type Reply struct{}
