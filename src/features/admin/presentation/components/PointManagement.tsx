'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { User } from '../utils/adminTypes';
import { sanitizeNumberInput, isValidPoint, formatPoints, POINT_STEP } from '../utils/pointUtils';

const DUMMY_USERS: User[] = [
  { userId: 1, name: '김카테나', nickname: '갓테나', totalPoints: 4520 },
  { userId: 2, name: '이게이머', nickname: '게이머', totalPoints: -120 },
  { userId: 3, name: '박플레이', nickname: '플레이어', totalPoints: 3450 },
];

export default function PointManagement() {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkAmount, setBulkAmount] = useState('');
  const [individualAmounts, setIndividualAmounts] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  // 전체 선택 상태 업데이트
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = selectedIds.length > 0 && selectedIds.length < users.length;
    }
  }, [selectedIds.length, users.length]);

  const toggleAll = useCallback((checked: boolean) => {
    setSelectedIds(checked ? users.map(u => u.userId) : []);
  }, [users]);

  const toggleOne = useCallback((id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const handleBulkAmountChange = useCallback((value: string) => {
    setBulkAmount(sanitizeNumberInput(value));
  }, []);

  const handleIndividualInputChange = useCallback((id: number, value: string) => {
    setIndividualAmounts(prev => ({
      ...prev,
      [id]: sanitizeNumberInput(value)
    }));
  }, []);

  const adjustIndividualPoints = useCallback((id: number, delta: number) => {
    setIndividualAmounts(prev => {
      const current = Number(prev[id] || 0);
      const newValue = current + delta;
      return { ...prev, [id]: newValue.toString() };
    });
  }, []);

  const onBulkApply = useCallback(async () => {
    if (!isValidPoint(bulkAmount) || selectedIds.length === 0) {
      setError('유효한 금액과 선택된 사용자가 필요합니다.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const amount = Number(bulkAmount);

      setUsers(users.map(u =>
        selectedIds.includes(u.userId)
          ? { ...u, totalPoints: (u.totalPoints || 0) + amount }
          : u
      ));

      setBulkAmount('');
      setSelectedIds([]);
      alert(`${selectedIds.length}명에게 ${amount}P 일괄 적용됨`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류 발생');
    } finally {
      setLoading(false);
    }
  }, [bulkAmount, selectedIds, users]);

  const onIndividualApply = useCallback(async (id: number) => {
    const amount = Number(individualAmounts[id] || 0);

    if (!isValidPoint(individualAmounts[id])) {
      setError(`ID ${id}: 유효한 금액을 입력하세요.`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      setUsers(users.map(u =>
        u.userId === id
          ? { ...u, totalPoints: (u.totalPoints || 0) + amount }
          : u
      ));

      setIndividualAmounts(prev => ({ ...prev, [id]: '' }));
      alert(`ID ${id}에게 ${amount}P 적용됨`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류 발생');
    } finally {
      setLoading(false);
    }
  }, [individualAmounts, users]);

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-sm text-rose-600 font-bold flex justify-between items-center">
          ⚠️ {error}
          <button onClick={() => setError(null)} className="text-lg">✕</button>
        </div>
      )}

      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-600">
            선택 <span className="text-blue-600">{selectedIds.length}</span>명
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={bulkAmount}
            onChange={(e) => handleBulkAmountChange(e.target.value)}
            placeholder="일괄 금액 (+/-)"
            className="w-36 px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            disabled={loading}
          />
          <button
            onClick={onBulkApply}
            disabled={selectedIds.length === 0 || loading}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl disabled:opacity-30 hover:bg-slate-800 transition-all"
          >
            {loading ? '처리중...' : '일괄 적용'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 w-12 text-center">
                <input
                  ref={checkboxRef}
                  type="checkbox"
                  checked={selectedIds.length === users.length && users.length > 0}
                  onChange={(e) => toggleAll(e.target.checked)}
                  className="w-4 h-4 accent-slate-900"
                  disabled={loading}
                />
              </th>
              <th className="p-4 text-xs font-bold text-slate-500">이름 / 닉네임</th>
              <th className="p-4 text-xs font-bold text-slate-500">현재 포인트</th>
              <th className="p-4 text-xs font-bold text-slate-500 text-right">개별 조정</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.userId)}
                    onChange={() => toggleOne(user.userId)}
                    className="w-4 h-4 accent-slate-900"
                    disabled={loading}
                  />
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.nickname}</div>
                </td>
                <td className={`p-4 text-sm font-bold ${(user.totalPoints || 0) < 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                  {formatPoints(user.totalPoints || 0)} P
                </td>
                <td className="p-4">
                  <div className="flex justify-end items-center gap-2">
                    <div className="flex items-center shadow-sm rounded-xl border border-slate-200 overflow-hidden bg-white">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={individualAmounts[user.userId] || ''}
                        onChange={(e) => handleIndividualInputChange(user.userId, e.target.value)}
                        placeholder="0"
                        className="w-16 h-9 text-center text-sm font-semibold text-slate-700 outline-none disabled:opacity-50"
                        disabled={loading}
                      />
                      <button
                        onClick={() => adjustIndividualPoints(user.userId, -POINT_STEP)}
                        className="w-8 h-9 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border-r border-slate-200 disabled:opacity-50"
                        disabled={loading}
                      >
                        −
                      </button>
                      <button
                        onClick={() => adjustIndividualPoints(user.userId, POINT_STEP)}
                        className="w-8 h-9 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border-l border-slate-200 disabled:opacity-50"
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onIndividualApply(user.userId)}
                      disabled={loading}
                      className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100 disabled:opacity-50"
                    >
                      적용
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}