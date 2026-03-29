import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = await prisma.subject.findUnique({
    where: { slug },
    include: { chapters: true },
  });

  if (!subject) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{subject.name}</h1>
      <p className="text-gray-500 mb-12">{subject.description}</p>

      <div className="flex flex-col gap-4">
        {subject.chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/subjects/${subject.slug}/chapters/${chapter.slug}`}
            className="border rounded-xl p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{chapter.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
