'use client';

import { PostEditor } from './PostEditor';
import { useNoticeWrite } from '../../application/hooks/useNoticeWrite';

export function NoticeWriteForm() {
  const {
    title, setTitle, content, setContent, files,
    fileInputRef, handleFileChange, removeFile, handleSubmit
  } = useNoticeWrite();

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="제목을 입력해 주세요."
        className="w-full bg-white border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:border-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <PostEditor value={content} onChange={setContent} />

      {/* 파일 첨부 영역 */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-2">첨부파일</label>
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer bg-white"
        >
          <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileChange} />
          <p className="text-gray-500">📂 <span className="font-bold text-blue-600">클릭</span>하여 파일을 추가하세요</p>
        </div>

        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg text-sm">
                <span>📎 {file.name}</span>
                <button onClick={() => removeFile(index)} className="text-red-500 font-bold">삭제 ✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button onClick={handleSubmit} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold">등록</button>
      </div>
    </div>
  );
}