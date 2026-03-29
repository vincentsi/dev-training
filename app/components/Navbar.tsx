import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-6 py-4 flex items-center justify-between">
      <span className="font-bold text-lg">Dev Training</span>
      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/subjects">Subjects</Link>
      </div>
    </nav>
  );
}
