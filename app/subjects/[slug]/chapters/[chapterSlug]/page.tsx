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
    where: {
      slug: chapterSlug,
      subject: { slug },
    },
    include: {
      subject: true,
      lessons: { orderBy: { order: "asc" } },
      exercises: { orderBy: { order: "asc" } },
    },
  });

  if (!chapter) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href={`/subjects/${slug}`}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 block"
      >
        ← {chapter.subject.name}
      </Link>

      <h1 className="text-4xl font-bold mb-12">{chapter.title}</h1>

      {chapter.lessons.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Cours</h2>
          <div className="flex flex-col gap-3">
            {chapter.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/subjects/${slug}/chapters/${chapterSlug}/lessons/${lesson.slug}`}
                className="border rounded-xl p-5 hover:shadow-md transition"
              >
                {lesson.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {chapter.exercises.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Exercices</h2>
          <div className="flex flex-col gap-3">
            {chapter.exercises.map((exercise) => (
              <Link
                key={exercise.id}
                href={`/subjects/${slug}/chapters/${chapterSlug}/exercises/${exercise.slug}`}
                className="border rounded-xl p-5 hover:shadow-md transition flex justify-between items-center"
              >
                <span>{exercise.title}</span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    exercise.difficulty === "easy"
                      ? "bg-green-100 text-green-700"
                      : exercise.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {exercise.difficulty}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {chapter.lessons.length === 0 && chapter.exercises.length === 0 && (
        <p className="text-gray-400">Aucun contenu pour le moment.</p>
      )}
    </main>
  );
}
