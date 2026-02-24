import { BoardWriteForm } from '@/features/board/presentation/components/BoardWriteForm';

export default function FreeWritePage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl mt-24">
      <h1 className="text-3xl font-bold mb-6 text-black">자유게시판 글쓰기</h1>
      <BoardWriteForm type="FREE" />
    </main>
  );
}