import { Demo } from "~/app/_components/demo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-2xl font-bold">Anon Demo</h1>

        <Demo />
      </div>
    </main>
  );
}
