'use client';

export function Pagination() {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 border rounded bg-white text-black hover:bg-gray-100">1</button>
      <button className="px-3 py-1 border rounded bg-white text-black hover:bg-gray-100">2</button>
      <button className="px-3 py-1 border rounded bg-white text-black hover:bg-gray-100">3</button>
    </div>
  );
}