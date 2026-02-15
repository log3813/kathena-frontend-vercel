'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useNoticeWrite() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((previousFiles) => [...previousFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    // 가이드 준수: 약어 'i' 대신 'index' 사용
    setFiles((previousFiles) => previousFiles.filter((_, fileIndex) => fileIndex !== index));
  };

  const handleSubmit = () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요!');
      return;
    }
    // 실제 API 호출 로직이 들어갈 자리
    console.log('등록 데이터:', { title, content, files });
    alert(`공지사항이 등록되었습니다!`);
    router.push('/board/notice');
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    files,
    fileInputRef,
    handleFileChange,
    removeFile,
    handleSubmit,
  };
}