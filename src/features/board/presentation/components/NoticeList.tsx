"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/shared/components/ui/Pagination';

const MOCK_NOTICES = [
  { id: '1', title: '2026학년도 K.ATHENA 신입 부원 모집 안내', author: '관리자', date: '2026-02-24', viewCount: 1540 },
  { id: '2', title: '동아리 방 이용 규칙 개정 안내', author: '운영진', date: '2026-02-24', viewCount: 820 },
  { id: '3', title: '제 1회 카테나 내전 일정과 공지', author: '운영진', date: '2026-02-24', viewCount: 450 },
  { id: '4', title: '공용 장비 대여 방법 안내', author: '관리자', date: '2026-02-24', viewCount: 310 }
];

export function NoticeList() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">공지사항</h1>
          <p className="text-slate-500">동아리의 중요한 소식을 전해드립니다.</p>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-sm">
              <th className="px-6 py-4 font-semibold">제목</th>
              <th className="px-6 py-4 font-semibold">작성자</th>
              <th className="px-6 py-4 font-semibold">날짜</th>
              <th className="px-6 py-4 font-semibold text-center">조회수</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_NOTICES.map((notice) => (
              <tr 
                key={notice.id} 
                onClick={() => router.push(`/board/notice/${notice.id}`)}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 text-slate-900 font-medium hover:text-blue-600">
                  {notice.title}
                </td>
                <td className="px-6 py-4 text-slate-600">{notice.author}</td>
                <td className="px-6 py-4 text-slate-500">{notice.date}</td>
                <td className="px-6 py-4 text-slate-500 text-center">{notice.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative flex items-center justify-center mt-8">
        <Pagination />
        <div className="absolute right-0">
          <Link href="/board/notice/write" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            글쓰기
          </Link>
        </div>
      </div>
    </div>
  );
}