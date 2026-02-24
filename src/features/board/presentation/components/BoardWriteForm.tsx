'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostEditor } from './PostEditor';

interface BoardWriteFormProps {
  type: 'NOTICE' | 'FREE';
}

export function BoardWriteForm({ type }: BoardWriteFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    console.log({ title, content, type, date: '2026-02-24' });
    alert('등록되었습니다.');
    router.push(`/board/${type.toLowerCase()}`);
  };

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="제목을 입력해 주세요."
        className="w-full border border-gray-300 rounded-lg p-4 text-black focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <PostEditor value={content} onChange={setContent} />
      <div className="flex justify-end gap-4">
        <button onClick={() => router.back()} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg">취소</button>
        <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg">등록</button>
      </div>
    </div>
  );
}