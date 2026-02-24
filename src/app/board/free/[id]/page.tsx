import { PostDetail } from '@/features/board/presentation/components/PostDetail';

export default async function FreeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="container mx-auto px-4 py-8 mt-24">
      <PostDetail type="FREE" id={id} />
    </main>
  );
}