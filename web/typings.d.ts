import '@umijs/max/typings';


declare export interface IHeader {
    code: number;
    message: string;
    trace_id: number;
}

declare export interface IResponse<Data> {
    header: IHeader;
    data: Data,
}