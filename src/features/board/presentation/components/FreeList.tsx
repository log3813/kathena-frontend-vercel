"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/shared/components/ui/Pagination';

const MOCK_POSTS = [
  { id: '1', title: '오늘 내전 하실 분 구함', author: '송종민', date: '2026-02-24', viewCount: 45 },
  { id: '2', title: '바탕화면에 이거 뭐임?', author: '김철수', date: '2026-02-24', viewCount: 12 },
  { id: '3', title: '발로란트 감도 추천 좀', author: '이영희', date: '2026-02-24', viewCount: 89 },
  { id: '4', title: '어제 동아리방에 우산 두고 가신 분', author: '박민준', date: '2026-02-24', viewCount: 23 }
];

export function FreeList() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">자유게시판</h1>
          <p className="text-slate-500">자유롭게 이야기를 나누는 공간입니다.</p>
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
            {MOCK_POSTS.map((post) => (
              <tr 
                key={post.id}
                onClick={() => router.push(`/board/free/${post.id}`)}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 text-slate-900 font-medium hover:text-blue-600">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-slate-600">{post.author}</td>
                <td className="px-6 py-4 text-slate-500">{post.date}</td>
                <td className="px-6 py-4 text-slate-500 text-center">{post.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative flex items-center justify-center mt-8">
        <Pagination />
        <div className="absolute right-0">
          <Link href="/board/free/write" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            글쓰기
          </Link>
        </div>
      </div>
    </div>
  );
}