export const DEFAULT_NAME = 'Umi Max';
export const TOKEN_KEY = "x-auth-token";


export const enum HTTP_METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export const ignore_apis = ['/api/user/login', '/api/user/refresh']