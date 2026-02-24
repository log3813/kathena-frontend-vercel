'use client';

import { useRouter } from 'next/navigation';

interface PostDetailProps {
  type: 'NOTICE' | 'FREE';
  id: string;
}

const NOTICES = [
  { id: '1', title: '2026학년도 K.ATHENA 신입 부원 모집 안내', author: '관리자', date: '2026-02-24', viewCount: 1540, content: '신입 부원 모집 상세 내용입니다.' },
  { id: '2', title: '동아리 방 이용 규칙 개정 안내', author: '운영진', date: '2026-02-24', viewCount: 820, content: '규칙 개정 상세 내용입니다.' },
  { id: '3', title: '제 1회 카테나 내전 일정과 공지', author: '운영진', date: '2026-02-24', viewCount: 450, content: '내전 일정 상세 내용입니다.' },
  { id: '4', title: '공용 장비 대여 방법 안내', author: '관리자', date: '2026-02-24', viewCount: 310, content: '대여 방법 상세 내용입니다.' }
];

const FREE_POSTS = [
  { id: '1', title: '오늘 내전 하실 분 구함', author: '송종민', date: '2026-02-24', viewCount: 45, content: '발로란트 내전 참여하실 분을 찾습니다.' },
  { id: '2', title: '바탕화면에 이거 뭐임?', author: '김철수', date: '2026-02-24', viewCount: 12, content: '바탕화면 아이콘 관련 상세 질문입니다.' },
  { id: '3', title: '발로란트 감도 추천 좀', author: '이영희', date: '2026-02-24', viewCount: 89, content: '감도 설정 관련 상세 가이드입니다.' },
  { id: '4', title: '어제 동아리방에 우산 두고 가신 분', author: '박민준', date: '2026-02-24', viewCount: 23, content: '분실물 우산에 대한 상세 안내입니다.' }
];

export function PostDetail({ type, id }: PostDetailProps) {
  const router = useRouter();
  const isNotice = type === 'NOTICE';
  const dataList = isNotice ? NOTICES : FREE_POSTS;
  const post = dataList.find((item) => item.id === id) || dataList[0];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-8 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${isNotice ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
            {isNotice ? '공지사항' : '자유게시판'}
          </span>
          <span className="text-slate-400 text-sm"># {id}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-6">{post.title}</h1>
        <div className="flex justify-between items-center text-sm text-slate-500">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-700">{post.author}</span>
            <span>{post.date}</span>
          </div>
          <div>
            <span>조회수 {post.viewCount}</span>
          </div>
        </div>
      </div>
      <div className="p-8 min-h-[400px] text-slate-800 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
      <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between">
        <button onClick={() => router.push(`/board/${type.toLowerCase()}`)} className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg">목록으로</button>
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg">수정</button>
          <button className="px-6 py-2 bg-red-50 text-red-600 rounded-lg">삭제</button>
        </div>
      </div>
    </div>
  );
}