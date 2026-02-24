import { BoardWriteForm } from '@/features/board/presentation/components/BoardWriteForm';
import { RoleGuard } from '@/shared/components/auth/RoleGuard';

export default function NoticeWritePage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl mt-24">
      <RoleGuard allowedRoles={['ADMIN']}>
        <h1 className="text-3xl font-bold mb-6 text-black">공지사항 작성</h1>
        <BoardWriteForm type="NOTICE" />
      </RoleGuard>
    </main>
  );
}