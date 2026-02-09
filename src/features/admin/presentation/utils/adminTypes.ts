export type Role = 'USER' | 'MEMBER' | 'ADMIN';
export type Status = 'PENDING' | 'ACTIVE' | 'BANNED';

export interface User {
    userId: number;
    name: string;
    nickname: string;
    totalPoints?: number;
    role?: Role;
    status?: Status;
    signupDate?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}