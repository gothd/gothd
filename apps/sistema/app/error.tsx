"use client"; // error.tsx precisa ser client component
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Erro interno</h1>
      <p className="mt-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Tentar novamente
      </button>
    </div>
  );
}