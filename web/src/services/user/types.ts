export interface Token {
    userId: number;
    expireTime: number;
    accessToken: string;
    refreshToken: string;
}
