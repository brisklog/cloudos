package list

import (
	"cloudos/common/pb"
	"cloudos/internal/model"
	"time"
)

func (c *Controller) Deal() (any, pb.ECode) {
	params := c.Params.(*Params)

	if params.Pager == nil {
		params.Pager = &pb.Pager{
			Index: 1,
			Size:  10,
		}
	}

	dao := new(model.NoteDao)
	tx := dao.Db().Model(new(pb.Note)).Scopes(dao.NotDeleted).Order("update_time desc")

	if len(params.Keyword) > 0 {
		keyword := dao.Like(params.Keyword)
		tx.Where("title like ? or content like ?", keyword, keyword)
	}

	if len(params.Topic) > 0 {
		tx.Where("topic = ?", params.Topic)
	}

	if len(params.Label) > 0 {
		tx.Where("id in (select note_id from note_label where name like ?)", dao.Like(params.Label))
	}

	if params.UpdateTimeRange != nil {
		tx.Where("update_time between ? and ?", params.UpdateTimeRange.Left, params.UpdateTimeRange.Right)
	}

	var notes []*pb.Note
	tx.Count(&params.Pager.Count)
	err := tx.Scopes(dao.Paginate(params.Pager)).Find(&notes).Error
	if err != nil {
		panic(err)
	}
	reply := Reply{
		Pager: params.Pager,
		List:  make([]Item, 0, len(notes)),
	}
	noteLables := dao.NoteLabels(notes)

	for _, note := range notes {
		item := Item{
			Id:         note.Id,
			Title:      note.Title,
			Topic:      note.Topic,
			Labels:     []string{},
			CreateTime: time.Unix(note.CreateTime, 0).Format(time.DateTime),
			UpdateTime: time.Unix(note.UpdateTime, 0).Format(time.DateTime),
		}
		if labels, ok := noteLables[note.Id]; ok {
			item.Labels = labels
		}

		reply.List = append(reply.List, item)
	}

	return reply, pb.ECode_SUCCESS
}
