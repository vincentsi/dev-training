import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SubjectsPage() {
  const subjects = await prisma.subject.findMany({
    include: {
      _count: {
        select: { chapters: true },
      },
    },
  });

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <p className="font-mono text-green-600 dark:text-green-500 text-sm mb-3">{`// tous les sujets`}</p>
      <h1 className="text-5xl font-bold mb-4">Subjects</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-12">
        Cours et exercices organisés par sujet.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/subjects/${subject.slug}`}
            className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6 hover:border-green-500 dark:hover:border-green-500 transition-colors bg-white dark:bg-[#161b22] group"
          >
            <h2 className="font-mono font-semibold text-lg group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors mb-2">
              {subject.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {subject.description}
            </p>
            <p className="font-mono text-xs text-gray-400">
              {subject._count.chapters} chapitre
              {subject._count.chapters > 1 ? "s" : ""}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
