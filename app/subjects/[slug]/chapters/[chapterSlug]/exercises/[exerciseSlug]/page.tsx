import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string; exerciseSlug: string }>;
}) {
  const { slug, chapterSlug, exerciseSlug } = await params;

  const exercise = await prisma.exercise.findFirst({
    where: {
      slug: exerciseSlug,
      chapter: {
        slug: chapterSlug,
        subject: { slug },
      },
    },
    include: {
      chapter: {
        include: { subject: true },
      },
    },
  });

  if (!exercise) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href={`/subjects/${slug}/chapters/${chapterSlug}`}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 block"
      >
        ← {exercise.chapter.title}
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-4xl font-bold">{exercise.title}</h1>
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
      </div>

      <p className="text-gray-600 mb-8">{exercise.question}</p>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Ta réponse</label>
        <textarea
          className="w-full border rounded-xl p-4 min-h-40 font-mono text-sm resize-y"
          placeholder="Écris ta réponse ici..."
        />
      </div>

      <details className="border rounded-xl p-4">
        <summary className="cursor-pointer font-medium">
          Voir la correction
        </summary>
        <div className="mt-4 text-gray-600 whitespace-pre-wrap">
          {exercise.answer}
        </div>
      </details>
    </main>
  );
}
