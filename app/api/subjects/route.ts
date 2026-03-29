import { prisma } from "@/lib/prisma";

export async function GET() {
  const subjects = await prisma.subject.findMany();
  return Response.json(subjects);
}
