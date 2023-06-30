package api

import (
	"cloudos/internal/controller/note/addtag"
	"cloudos/internal/controller/note/create"
	"cloudos/internal/controller/note/delete"
	"cloudos/internal/controller/note/deltag"
	"cloudos/internal/controller/note/list"
	"cloudos/internal/controller/note/topics"
	"cloudos/internal/controller/note/update"

	"github.com/gin-gonic/gin"
)

// NoteList
// @summary 文档列表
// @Tags 文档
// @Accept json
// @Produce json
// @Param param body list.Params true "请求参数"
// @Response 200 object system.Response{data=list.Reply} "调用成功"
// @Router /api/note/list [post]
func (a *Api) NoteList(ctx *gin.Context) {
	a.Scheduler(list.NewController(ctx))
}

// NoteCreate
// @summary 新建文档
// @Tags 文档
// @Accept json
// @Produce json
// @Param param body create.Params true "请求参数"
// @Response 200 object system.Response{data=create.Reply} "调用成功"
// @Router /api/note/create [post]
func (a *Api) NoteCreate(ctx *gin.Context) {
	a.Scheduler(create.NewController(ctx))
}

// NoteUpdate
// @summary 更新文档
// @Tags 文档
// @Accept json
// @Produce json
// @Param param body update.Params true "请求参数"
// @Response 200 object system.Response{data=update.Reply} "调用成功"
// @Router /api/note/update [post]
func (a *Api) NoteUpdate(ctx *gin.Context) {
	a.Scheduler(update.NewController(ctx))
}

// NoteDelete
// @summary 删除文档
// @Tags 文档
// @Accept json
// @Produce json
// @Param param body delete.Params true "请求参数"
// @Response 200 object system.Response{data=delete.Reply} "调用成功"
// @Router /api/note/delete [post]
func (a *Api) NoteDelete(ctx *gin.Context) {
	a.Scheduler(delete.NewController(ctx))
}

// NoteAddtag
// @summary 添加标签
// @Tags 文档
// @Accept json
// @Produce json
// @Param param body addtag.Params true "请求参数"
// @Response 200 object system.Response{data=addtag.Reply} "调用成功"
// @Router /api/note/addtag [post]
func (a *Api) NoteAddtag(ctx *gin.Context) {
	a.Scheduler(addtag.NewController(ctx))
}

// NoteDeltag
// @summary 删除标签
// @Tags 文档
// @Accept json
// @Produce json
// @Param param body deltag.Params true "请求参数"
// @Response 200 object system.Response{data=deltag.Reply} "调用成功"
// @Router /api/note/deltag [post]
func (a *Api) NoteDeltag(ctx *gin.Context) {
	a.Scheduler(deltag.NewController(ctx))
}

// NoteTopics
// @summary 主题列表
// @Tags 文档
// @Accept json
// @Produce json
// @Param param body topics.Params true "请求参数"
// @Response 200 object system.Response{data=topics.Reply} "调用成功"
// @Router /api/note/topics [get]
func (a *Api) NoteTopics(ctx *gin.Context) {
	a.Scheduler(topics.NewController(ctx))
}
