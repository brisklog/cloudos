import { IPager, ITimeRange } from "typings";

export interface Note {
    id: number;
    name: string;
    topic: string;
    labels: string[];
    createTime: string;
    updateTime: string;
}


export type NoteListParams = {
    pager: IPager;
    topic?: string;
    keyword?: string;
    label?: string;
    updateTimeRange?: ITimeRange;
}

export type NoteListData = {
    pager: IPager;
    list: Note[];
}
