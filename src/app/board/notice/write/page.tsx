import { NoticeWriteForm } from '@/features/board/presentation/components/NoticeWriteForm';
import { RoleGuard } from '@/shared/components/auth/RoleGuard'; // 가이드 권장 사항

export default function NoticeWritePage() {
  return (
    <main className="container mx-auto px-4 py-8 min-h-screen max-w-4xl mt-24">
      {/* 관리자(ADMIN)와 정부원(MEMBER)만 작성 가능하도록 가드 적용 */}
      <RoleGuard allowedRoles={['ADMIN', 'MEMBER']} fallback={<p>권한이 없습니다.</p>}>
        <h1 className="text-3xl font-bold mb-6">공지사항 작성</h1>
        <NoticeWriteForm />
      </RoleGuard>
    </main>
  );
}