'use client';

import type { UserRole } from '@/shared/types/enums';
import { useRoleManagement } from '@/features/admin/application/hooks/useRoleManagement';

export function RoleManagement() {
  const {
    users,
    error,
    loadingUserId,
    stats,
    handleApprove,
    handleRoleChange,
    handleRemove,
    clearError,
  } = useRoleManagement();

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-sm text-rose-600 font-bold flex justify-between items-center">
          ⚠️ {error}
          <button onClick={clearError} className="text-lg cursor-pointer hover:opacity-70 transition-opacity">✕</button>
        </div>
      )}

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="text-xs font-bold text-slate-500 mb-1">승인 대기</div>
          <div className="text-xl font-black text-rose-500">{stats.pending}명</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="text-xs font-bold text-slate-500 mb-1">정회원(MEMBER)</div>
          <div className="text-xl font-black text-blue-600">{stats.members}명</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="text-xs font-bold text-slate-500 mb-1">전체 유저</div>
          <div className="text-xl font-black text-slate-900">{stats.total}명</div>
        </div>
      </div>

      {/* 유저 리스트 테이블 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">회원 정보</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">상태</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">권한 설정</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr
                key={user.userId}
                className="hover:bg-slate-50/50 transition-colors"
                onDoubleClick={() => user.status === 'PENDING' && handleApprove(user.userId)}
              >
                <td className="p-4">
                  <div className="text-sm font-bold text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">
                    @{user.nickname} · {user.createdAt ?? user.signupDate}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                    user.status === 'PENDING'
                      ? 'bg-amber-100 text-amber-600'
                      : user.status === 'ACTIVE'
                      ? 'bg-emerald-100 text-emerald-600'
                      : user.status === 'SUSPENDED'
                      ? 'bg-rose-100 text-rose-600'
                      : user.status === 'REJECTED'
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {user.status === 'PENDING' ? '대기' : user.status === 'ACTIVE' ? '활성' : user.status === 'SUSPENDED' ? '정지' : user.status === 'REJECTED' ? '거절' : '일시 중지'}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={user.role ?? 'USER'}
                    aria-label={`${user.name} 권한 설정`}
                    disabled={user.status === 'PENDING' || loadingUserId === user.userId}
                    onChange={(e) => handleRoleChange(user.userId, e.target.value as UserRole)}
                    className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/10 disabled:opacity-50 cursor-pointer"
                  >
                    <option value="USER">USER</option>
                    <option value="MEMBER">MEMBER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {user.status === 'PENDING' ? (
                      <button
                        onClick={() => handleApprove(user.userId)}
                        disabled={loadingUserId === user.userId}
                        title="더블클릭으로도 승인 가능"
                        className="px-3 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 shadow-md shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
                      >
                        {loadingUserId === user.userId ? '처리중...' : '가입 승인'}
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-[11px] font-bold rounded-lg cursor-pointer hover:bg-slate-50 transition-colors disabled:opacity-50">
                        정보 수정
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(user.userId)}
                      disabled={loadingUserId === user.userId}
                      className="px-3 py-1.5 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-lg hover:bg-rose-100 disabled:cursor-not-allowed cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {loadingUserId === user.userId ? '처리중...' : user.status === 'PENDING' ? '거절' : '강퇴'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 빈 상태 */}
      {users.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-sm font-bold">등록된 회원이 없습니다.</div>
        </div>
      )}
    </div>
  );
}