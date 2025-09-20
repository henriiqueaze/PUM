import type { CreateUser, LoginResponse } from "./api.interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/';

export class ApiService {
    private getHeaders(includeAuth = true): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (includeAuth) {
            const token = localStorage.getItem('token');
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
        }

        return headers;
    }

    async login(userName: string, password: string, fullName: string): Promise<LoginResponse> {
        try {
            const body: any = { userName, fullName, password };

            const response = await fetch(`${API_BASE_URL}/auth/signIn`, {
                method: 'POST',
                headers: this.getHeaders(false),
                body: JSON.stringify(body),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            return {
                user: {},
                statusCode: 500,
                message: 'Network error. Please try again.',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    async createUser(userData: CreateUser): Promise<any> {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(userData),
            });

            return await response.json();
        } catch (error) {
            return {
                message: 'Failed to create user',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
}