import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const subjects = await prisma.subject.findMany();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">Dev Training</h1>
      <p className="text-gray-500 mb-12">
        Ma plateforme d&apos;apprentissage — cours théoriques et exercices
        pratiques.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/subjects/${subject.slug}`}
            className="border rounded-xl p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{subject.name}</h2>
            <p className="text-gray-500 text-sm">{subject.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
