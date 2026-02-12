import type { UserRole, UserStatus } from '@/shared/types/enums';

export type Role = UserRole;
export type Status = UserStatus;

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