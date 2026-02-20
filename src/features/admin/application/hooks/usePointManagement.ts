'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { User } from '@/shared/types';
import { sanitizeNumberInput, isValidPoint, applyBulkPoints, applyPoints, POINT_STEP } from '@/features/admin/domain/services/pointService';

const DUMMY_USERS: User[] = [
  {
    userId: 1,
    loginId: 'kathena',
    name: '김카테나',
    nickname: '갓테나',
    currentPoints: 4520,
  },
  {
    userId: 2,
    loginId: 'gamer',
    name: '이게이머',
    nickname: '게이머',
    currentPoints: -120,
  },
  {
    userId: 3,
    loginId: 'player',
    name: '박플레이',
    nickname: '플레이어',
    currentPoints: 3450,
  },
];

export function usePointManagement() {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkAmount, setBulkAmount] = useState('');
  const [handleAmounts, setHandleAmounts] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  // 전체 선택 상태 업데이트
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = selectedIds.length > 0 && selectedIds.length < users.length;
    }
  }, [selectedIds.length, users.length]);

  const handleToggleAll = useCallback((checked: boolean) => {
    setSelectedIds(checked ? users.map(u => u.userId) : []);
  }, [users]);

  const handleToggleOne = useCallback((id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const handleBulkAmountChange = useCallback((value: string) => {
    setBulkAmount(sanitizeNumberInput(value));
  }, []);

  const handleInputChange = useCallback((id: number, value: string) => {
    setHandleAmounts(prev => ({
      ...prev,
      [id]: sanitizeNumberInput(value),
    }));
  }, []);

  const handleAdjustPoints = useCallback((id: number, delta: number) => {
    setHandleAmounts(prev => {
      const current = Number(prev[id] || 0);
      const newValue = current + delta;
      return { ...prev, [id]: newValue.toString() };
    });
  }, []);

  const handleBulkApply = useCallback(async () => {
    if (!isValidPoint(bulkAmount) || selectedIds.length === 0) {
      setError('유효한 금액과 선택된 사용자가 필요합니다.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const amount = Number(bulkAmount);

      // TODO: API 호출 - bulkUpdatePointsAPI(selectedIds, amount)
      const pointMap = applyBulkPoints(
        Object.fromEntries(users.map(u => [u.userId, u.currentPoints || 0])),
        selectedIds,
        amount
      );

      setUsers(users.map(u => ({
        ...u,
        currentPoints: pointMap[u.userId] ?? u.currentPoints,
      })));

      setBulkAmount('');
      setSelectedIds([]);
      alert(`${selectedIds.length}명에게 ${amount}P 일괄 적용됨`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류 발생');
    } finally {
      setLoading(false);
    }
  }, [bulkAmount, selectedIds, users]);

  const handleApplyPoints = useCallback(async (id: number) => {
    const amount = Number(handleAmounts[id] || 0);

    if (!isValidPoint(handleAmounts[id])) {
      setError(`ID ${id}: 유효한 금액을 입력하세요.`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // TODO: API 호출 - updateUserPointAPI(id, amount)
      const newPoints = applyPoints(users.find(u => u.userId === id)?.currentPoints || 0, amount);

      setUsers(users.map(u =>
        u.userId === id
          ? { ...u, currentPoints: newPoints }
          : u
      ));

      setHandleAmounts(prev => ({ ...prev, [id]: '' }));
      alert(`ID ${id}에게 ${amount}P 적용됨`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류 발생');
    } finally {
      setLoading(false);
    }
  }, [handleAmounts, users]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    users,
    selectedIds,
    bulkAmount,
    handleAmounts,
    loading,
    error,
    checkboxRef,
    POINT_STEP,
    handleToggleAll,
    handleToggleOne,
    handleBulkAmountChange,
    handleInputChange,
    handleAdjustPoints,
    handleBulkApply,
    handleApplyPoints,
    clearError,
  };
}
