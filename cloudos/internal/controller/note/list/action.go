package list

import (
	"cloudos/common/pb"
)

func (c *Controller) Deal() (any, pb.ECode) {
	params := c.Params.(*Params)

	params.Pager.Count = 1

	reply := Reply{
		Pager: params.Pager,
		List:  make([]Item, 0),
	}

	// mock
	reply.List = append(reply.List, Item{
		Id:         1,
		Name:       "mock文档",
		TopicName:  "mock",
		CreateTime: "2023-03-15 10:10:10",
		UpdateTime: "2023-03-15 20:10:10",
		Labels: []Label{
			{
				Id:   1,
				Name: "lmc-1",
			},
			{
				Id:   2,
				Name: "lmc-2",
			},
		},
	})

	return reply, pb.ECode_SUCCESS
}
