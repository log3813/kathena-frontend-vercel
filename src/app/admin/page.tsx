'use client';

import { useState } from 'react';
import RoleManagement from '@/features/admin/presentation/components/RoleManagement';
import PointManagement from '@/features/admin/presentation/components/PointManagement';

type AdminTab = 'role' | 'point';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('role');

  const tabs = [
    { id: 'role', label: '회원 관리', icon: '👥' },
    { id: 'point', label: '포인트 관리', icon: '🪙' },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="animate-fadeIn">
          {activeTab === 'role' && <RoleManagement />}
          {activeTab === 'point' && <PointManagement />}
        </div>
      </div>
    </div>
  );
}
