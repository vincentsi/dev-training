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
      chapter: { slug: chapterSlug, subject: { slug } },
    },
    include: { chapter: { include: { subject: true } } },
  });

  if (!exercise) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/subjects/${slug}/chapters/${chapterSlug}`}
        className="font-mono text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mb-8 block transition"
      >
        ← {exercise.chapter.title}
      </Link>

      <p className="font-mono text-green-600 dark:text-green-500 text-sm mb-3">{`// exercise`}</p>

      <div className="flex items-center gap-3 mb-12">
        <h1 className="text-5xl font-bold">{exercise.title}</h1>
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
      </div>

      <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6 bg-white dark:bg-[#161b22] mb-8">
        <p className="font-mono text-xs text-gray-400 mb-3">// question</p>
        <p className="text-gray-700 dark:text-gray-300">{exercise.question}</p>
      </div>

      <div className="mb-8">
        <p className="font-mono text-xs text-gray-400 mb-3">// ta réponse</p>
        <textarea
          className="w-full border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-4 min-h-40 font-mono text-sm resize-y bg-white dark:bg-[#161b22] text-gray-700 dark:text-gray-300 focus:outline-none focus:border-green-500 transition-colors"
          placeholder="Écris ta réponse ici..."
        />
      </div>

      <details className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#161b22] group">
        <summary className="cursor-pointer p-5 font-mono text-sm text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
          {`// voir la correction`}
        </summary>
        <div className="px-5 pb-5 font-mono text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap border-t border-gray-200 dark:border-[#2a2a2a] pt-4">
          {exercise.answer}
        </div>
      </details>
    </main>
  );
}
