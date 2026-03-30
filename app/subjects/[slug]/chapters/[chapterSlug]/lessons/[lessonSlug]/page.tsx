import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string; lessonSlug: string }>;
}) {
  const { slug, chapterSlug, lessonSlug } = await params;

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      chapter: { slug: chapterSlug, subject: { slug } },
    },
    include: { chapter: { include: { subject: true } } },
  });

  if (!lesson) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/subjects/${slug}/chapters/${chapterSlug}`}
        className="font-mono text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mb-8 block transition"
      >
        ← {lesson.chapter.title}
      </Link>

      <p className="font-mono text-green-600 dark:text-green-500 text-sm mb-3">{`// lesson`}</p>
      <h1 className="text-5xl font-bold mb-12">{lesson.title}</h1>

      <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-8 bg-white dark:bg-[#161b22] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
        {lesson.content}
      </div>
    </main>
  );
}
