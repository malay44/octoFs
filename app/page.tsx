export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-2 w-full flex-1 px-20 text-center">
      <h1 className="text-6xl font-bold">
        Welcome to <span className="text-blue-600">Octo FS</span>
      </h1>
      <p className="mt-3 text-2xl">
        Get started by editing
        <code className="p-3 font-mono text-lg bg-secondary rounded-md">
          pages/index.js
        </code>
      </p>
    </main>
  );
}
