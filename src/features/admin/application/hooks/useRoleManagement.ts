'use client';

import { useState, useMemo, useCallback } from 'react';
import type { User } from '@/shared/types';
import type { UserRole, UserStatus } from '@/shared/types/enums';
import type { UserStats } from '@/features/admin/domain/entities/User';

const DUMMY_USERS: User[] = [
  {
    userId: 1,
    loginId: 'user1',
    name: '신규유저',
    nickname: '뉴비1',
    role: 'USER' as UserRole,
    status: 'PENDING' as UserStatus,
    createdAt: '2026-02-07',
    signupDate: '2026-02-07',
  },
  {
    userId: 2,
    loginId: 'kathena',
    name: '김카테나',
    nickname: '갓테나',
    role: 'ADMIN' as UserRole,
    status: 'ACTIVE' as UserStatus,
    createdAt: '2025-12-01',
    signupDate: '2025-12-01',
  },
  {
    userId: 3,
    loginId: 'gamer',
    name: '이게이머',
    nickname: '게이머',
    role: 'MEMBER' as UserRole,
    status: 'ACTIVE' as UserStatus,
    createdAt: '2026-01-15',
    signupDate: '2026-01-15',
  },
];

export function useRoleManagement() {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [error, setError] = useState<string | null>(null);
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  const stats: UserStats = useMemo(() => ({
    pending: users.filter(u => u.status === 'PENDING').length,
    members: users.filter(u => u.role === 'MEMBER').length,
    total: users.length,
  }), [users]);

  const handleApprove = useCallback((id: number) => {
    setLoadingUserId(id);
    try {
      setUsers(prev =>
        prev.map(u => (u.userId === id ? { ...u, status: 'ACTIVE' as UserStatus } : u))
      );
      setError(null);
    } catch (err) {
      setError('승인 처리 중 오류 발생');
    } finally {
      setLoadingUserId(null);
    }
  }, []);

  const handleRoleChange = useCallback((id: number, role: UserRole) => {
    setLoadingUserId(id);
    try {
      setUsers(prev => prev.map(u => (u.userId === id ? { ...u, role } : u)));
      setError(null);
    } catch {
      setError('권한 변경 중 오류 발생');
    } finally {
      setLoadingUserId(null);
    }
  }, []);

  const handleRemove = useCallback((id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    setLoadingUserId(id);
    try {
      setUsers(prev => prev.filter(u => u.userId !== id));
      setError(null);
    } catch {
      setError('삭제 중 오류 발생');
    } finally {
      setLoadingUserId(null);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    users,
    error,
    loadingUserId,
    stats,
    handleApprove,
    handleRoleChange,
    handleRemove,
    clearError,
  };
}
