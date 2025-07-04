import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Welcome to Faraz Raya Task</h1>
        <Link
          href={"/users"}
          className="bg-amber-800 text-lime-50 px-4 py-2 rounded-md hover:bg-green-600"
        >
          go to Users
        </Link>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        This project is test
      </footer>
    </div>
  );
}
