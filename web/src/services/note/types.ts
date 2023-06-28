import { IPager } from "typings";

export interface Note {
    id: number;
    name: string;
    topicName: string;
    labels: Label[];
    createTime: string;
    updateTime: string;
}

export interface Label {
    id: number;
    name: string;
}


export type NoteListParams = {
    pager: IPager;
    topicId?: number;
    keyword: string;
    // label: string;
}

export type NoteListData = {
    pager: IPager;
    list: Note[];
}