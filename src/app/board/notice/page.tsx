'use client';

import { useState } from 'react';
import Link from 'next/link'; // 👈 Link import 필수!
import { Pagination } from '@/shared/components/ui/Pagination';

// 가짜 데이터
const MOCK_NOTICES = [
  { id: 1, title: '[필독] 2026학년도 KATHENA 신입 부원 모집 안내', author: '관리자', date: '2026. 02. 01', viewCount: 1540 },
  { id: 2, title: '동아리 방 이용 규칙 개정 안내 (26.02.10부터)', author: '관리자', date: '2026. 02. 05', viewCount: 820 },
  { id: 3, title: '제 1회 카테나 롤 내전 대진표 공개', author: '운영진', date: '2026. 02. 12', viewCount: 450 },
  { id: 4, title: '포인트 샵 신규 굿즈 입고 안내', author: '관리자', date: '2026. 02. 14', viewCount: 210 },
  { id: 5, title: '2월 정기 총회 장소 변경 공지', author: '관리자', date: '2026. 02. 15', viewCount: 105 },
];

export default function NoticeBoardPage() {
  const [page, setPage] = useState(1);

  return (
    <main className="container mx-auto px-4 py-8 text-slate-800 min-h-screen mt-20">
      
      {/* 상단 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">공지사항</h1>
        <p className="text-slate-600">동아리의 중요한 소식을 전해드립니다.</p>
      </div>

      {/* 테이블 영역 */}
      <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-sm">
              <th className="py-4 px-6 font-medium w-20 text-center">번호</th>
              <th className="py-4 px-6 font-medium">제목</th>
              <th className="py-4 px-6 font-medium w-32 text-center">작성자</th>
              <th className="py-4 px-6 font-medium w-32 text-center">작성일</th>
              <th className="py-4 px-6 font-medium w-24 text-center">조회수</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_NOTICES.map((notice) => (
              <tr key={notice.id} className="hover:bg-slate-50 transition-colors cursor-pointer text-sm">
                <td className="py-4 px-6 text-center text-slate-500 font-medium">{notice.id}</td>
                <td className="py-4 px-6 font-medium text-slate-900">{notice.title}</td>
                <td className="py-4 px-6 text-center text-slate-600">{notice.author}</td>
                <td className="py-4 px-6 text-center text-slate-500">{notice.date}</td>
                <td className="py-4 px-6 text-center text-slate-600">{notice.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 👇 하단 페이지네이션 + 글쓰기 버튼 영역 */}
      <div className="relative mt-8 flex justify-center items-center">
        <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
        
        {/* 글쓰기 버튼 추가됨! */}
        <Link 
          href="/board/notice/write"
          className="absolute right-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <span>글쓰기</span>
          <span>✏️</span>
        </Link>
      </div>

    </main>
  );
}