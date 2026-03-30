import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-6 py-4 flex items-center justify-between bg-white dark:bg-[#161b22] border-gray-200 dark:border-[#2a2a2a]">
      <Link
        href="/"
        className="font-mono font-bold text-lg text-green-600 dark:text-green-500"
      >
        dev-training<span className="animate-pulse">_</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition"
        >
          home
        </Link>
        <Link
          href="/subjects"
          className="text-sm text-gray-500 hover:teSxt-gray-900 dark:hover:text-gray-100 transition"
        >
          subjects
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
