'use client';

import { formatPoint } from '@/shared/utils/formatPoint';
import { usePointManagement } from '@/features/admin/application/hooks/usePointManagement';

export function PointManagement() {
  const {
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
  } = usePointManagement();

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-sm text-rose-600 font-bold flex justify-between items-center">
          ⚠️ {error}
          <button onClick={clearError} className="text-lg cursor-pointer hover:opacity-70 transition-opacity">✕</button>
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
            onClick={handleBulkApply}
            disabled={selectedIds.length === 0 || loading}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-slate-800 transition-all"
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
                  onChange={(e) => handleToggleAll(e.target.checked)}
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
                    onChange={() => handleToggleOne(user.userId)}
                    className="w-4 h-4 accent-slate-900"
                    disabled={loading}
                  />
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.nickname}</div>
                </td>
                <td className={`p-4 text-sm font-bold ${(user.currentPoints || 0) < 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                  {formatPoint(user.currentPoints || 0)}
                </td>
                <td className="p-4">
                  <div className="flex justify-end items-center gap-2">
                    <div className="flex items-center shadow-sm rounded-xl border border-slate-200 overflow-hidden bg-white">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={handleAmounts[user.userId] || ''}
                        onChange={(e) => handleInputChange(user.userId, e.target.value)}
                        placeholder="0"
                        className="w-16 h-9 text-center text-sm font-semibold text-slate-700 outline-none disabled:opacity-50"
                        disabled={loading}
                      />
                      <button
                        onClick={() => handleAdjustPoints(user.userId, -POINT_STEP)}
                        className="w-8 h-9 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 cursor-pointer transition-colors border-r border-slate-200 disabled:opacity-50"
                        disabled={loading}
                      >
                        −
                      </button>
                      <button
                        onClick={() => handleAdjustPoints(user.userId, POINT_STEP)}
                        className="w-8 h-9 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 cursor-pointer transition-colors border-l border-slate-200 disabled:opacity-50"
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleApplyPoints(user.userId)}
                      disabled={loading}
                      className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed cursor-pointer transition-all shadow-md shadow-blue-100 disabled:opacity-50"
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