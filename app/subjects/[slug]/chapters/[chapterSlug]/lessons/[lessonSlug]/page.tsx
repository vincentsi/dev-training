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

  if (!lesson) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href={`/subjects/${slug}/chapters/${chapterSlug}`}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 block"
      >
        ← {lesson.chapter.title}
      </Link>

      <h1 className="text-4xl font-bold mb-8">{lesson.title}</h1>

      <div className="prose max-w-none">{lesson.content}</div>
    </main>
  );
}
