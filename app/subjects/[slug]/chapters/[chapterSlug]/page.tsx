import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}) {
  const { slug, chapterSlug } = await params;

  const chapter = await prisma.chapter.findFirst({
    where: { slug: chapterSlug, subject: { slug } },
    include: {
      subject: true,
      lessons: { orderBy: { order: "asc" } },
      exercises: { orderBy: { order: "asc" } },
    },
  });

  if (!chapter) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/subjects/${slug}`}
        className="font-mono text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mb-8 block transition"
      >
        ← {chapter.subject.name}
      </Link>

      <p className="font-mono text-green-600 dark:text-green-500 text-sm mb-3">{`// ${chapter.slug}`}</p>
      <h1 className="text-5xl font-bold mb-12">{chapter.title}</h1>

      {chapter.lessons.length > 0 && (
        <section className="mb-10">
          <p className="font-mono text-xs text-gray-400 mb-4">
            const lessons = [
          </p>
          <div className="flex flex-col gap-3">
            {chapter.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/subjects/${slug}/chapters/${chapterSlug}/lessons/${lesson.slug}`}
                className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-5 hover:border-green-500 dark:hover:border-green-500 transition-colors bg-white dark:bg-[#161b22] flex items-center gap-4 group"
              >
                <span className="font-mono text-xs text-gray-400 w-6">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-medium group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
                  {lesson.title}
                </span>
              </Link>
            ))}
          </div>
          <p className="font-mono text-xs text-gray-400 mt-3">]</p>
        </section>
      )}

      {chapter.exercises.length > 0 && (
        <section>
          <p className="font-mono text-xs text-gray-400 mb-4">
            const exercises = [
          </p>
          <div className="flex flex-col gap-3">
            {chapter.exercises.map((exercise, index) => (
              <Link
                key={exercise.id}
                href={`/subjects/${slug}/chapters/${chapterSlug}/exercises/${exercise.slug}`}
                className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-5 hover:border-green-500 dark:hover:border-green-500 transition-colors bg-white dark:bg-[#161b22] flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-gray-400 w-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
                    {exercise.title}
                  </span>
                </div>
                <span
                  className={`text-xs font-mono px-2 py-1 rounded ${
                    exercise.difficulty === "easy"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : exercise.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {exercise.difficulty}
                </span>
              </Link>
            ))}
          </div>
          <p className="font-mono text-xs text-gray-400 mt-3">]</p>
        </section>
      )}

      {chapter.lessons.length === 0 && chapter.exercises.length === 0 && (
        <p className="font-mono text-sm text-gray-400">
          // aucun contenu pour le moment
        </p>
      )}
    </main>
  );
}
