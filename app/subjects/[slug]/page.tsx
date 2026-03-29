import { prisma } from "@/lib/prisma";
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
        {subject.chapters.length === 0 && (
          <p className="text-gray-400">Aucun chapitre pour le moment.</p>
        )}
        {subject.chapters.map((chapter) => (
          <div key={chapter.id} className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold">{chapter.title}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
