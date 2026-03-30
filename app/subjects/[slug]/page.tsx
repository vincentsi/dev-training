import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = await prisma.subject.findUnique({
    where: { slug },
    include: { chapters: { orderBy: { order: "asc" } } },
  });

  if (!subject) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="font-mono text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mb-8 block transition"
      >
        ← home
      </Link>

      <p className="font-mono text-green-600 dark:text-green-500 text-sm mb-3">{`// ${subject.slug}`}</p>
      <h1 className="text-5xl font-bold mb-4">{subject.name}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-12">
        {subject.description}
      </p>

      <div className="flex flex-col gap-3">
        {subject.chapters.length === 0 && (
          <p className="font-mono text-sm text-gray-400">
            // aucun chapitre pour le moment
          </p>
        )}
        {subject.chapters.map((chapter, index) => (
          <Link
            key={chapter.id}
            href={`/subjects/${subject.slug}/chapters/${chapter.slug}`}
            className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-5 hover:border-green-500 dark:hover:border-green-500 transition-colors bg-white dark:bg-[#161b22] flex items-center gap-4 group"
          >
            <span className="font-mono text-xs text-gray-400 w-6">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-medium group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
              {chapter.title}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
