package model

import (
	"cloudos/common/pb"
	"errors"
	"time"

	"gorm.io/gorm"
)

type NoteDao struct {
	Base
}

func (dao *NoteDao) Create(obj *pb.Note) error {
	obj.CreateTime = time.Now().Local().Unix()
	obj.UpdateTime = obj.CreateTime
	return dao.Db().Create(obj).Error
}

func (dao *NoteDao) Update(obj *pb.Note) error {
	obj.UpdateTime = time.Now().Local().Unix()
	return dao.Db().Updates(obj).Error
}

func (dao *NoteDao) Delete(obj *pb.Note) error {
	ts := time.Now().Local().Unix()
	return dao.Db().Model(obj).Where("id = ?", obj.Id).UpdateColumn("delete_time", ts).Error
}

func (dao *NoteDao) First(query any, args ...any) *pb.Note {
	obj := new(pb.Note)
	err := dao.Db().Scopes(dao.NotDeleted).Where(query, args...).First(&obj).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil
	}
	return obj
}

func (dao *NoteDao) Labels(noteId int64) []string {
	labels := make([]string, 0)
	dao.Db().Model(new(pb.NoteLabel)).Scopes(dao.NotDeleted).Where("note_id = ?", noteId).Select("name").Scan(&labels)
	return labels
}

func (dao *NoteDao) NoteLabels(notes []*pb.Note) map[int64][]string {
	result := make(map[int64][]string)
	if len(notes) == 0 {
		return result
	}
	var noteIds []int64
	for _, note := range notes {
		noteIds = append(noteIds, note.Id)
	}
	var labels []*pb.NoteLabel
	dao.Db().Scopes(dao.NotDeleted).Where("note_id in ?", noteIds).Find(&labels)
	for _, label := range labels {
		result[label.NoteId] = append(result[label.NoteId], label.Name)
	}
	return result
}

func (dao *NoteDao) ListSelectFields() []string {
	return []string{"title", "topic", "create_time", "update_time"}
}
