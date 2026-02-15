import { NoticeWriteForm } from '@/features/board/presentation/components/NoticeWriteForm';
import { RoleGuard } from '@/shared/components/auth/RoleGuard';

export default function NoticeWritePage() {
  return (
    <main className="container mx-auto px-4 py-8 min-h-screen max-w-4xl mt-24">
      <RoleGuard allowedRoles={['ADMIN', 'MEMBER']} fallback={<p>권한이 없습니다.</p>}>
        <h1 className="text-3xl font-bold mb-6 text-black">공지사항 작성</h1>
        <NoticeWriteForm />
      </RoleGuard>
    </main>
  );
}