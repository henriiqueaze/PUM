export interface CreateUser {
    userName: string;
    fullName: string;
    password: string;
}

export interface LoginResponse {
    message?: string;
    user: {
        userName: string,
        active: boolean,
        created: Date,
        expiration: Date,
        accessToken: string,
        refreshToken: string
    } | any;
    statusCode?: number;
    error?: string;
}