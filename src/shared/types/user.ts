/**
 * 사용자 타입 정의
 * @description DB 스키마와 동기화된 사용자 정보 인터페이스
 */

import type { UserRole, UserStatus, EnrollmentStatus } from './enums';

export interface User {
  userId: number;
  loginId?: string;
  name?: string;
  nickname?: string;
  studentId?: string;
  department?: string;
  grade?: number;
  phoneNumber?: string;
  isMilitary?: boolean;
  enrollmentStatus?: EnrollmentStatus;
  role?: UserRole;
  status?: UserStatus;
  currentPoints?: number;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  /**
   * @deprecated Use `createdAt` instead
   */
  signupDate?: string;
}
