import '@umijs/max/typings';

declare interface IResponse<Data> {
    code: number;
    message: string;
    traceId: number;
    data: Data;
}
