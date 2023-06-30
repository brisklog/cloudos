import '@umijs/max/typings';

declare interface IResponse<Data> {
    code: number;
    message: string;
    traceId: number;
    data: Data;
}

declare interface IPager {
    index: number;
    size: number;
    count?: number;
    disable?: boolean;
}

declare interface ITimeRange {
    left: number;
    right: number;
}
