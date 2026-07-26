import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "../../ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <>
      <h1 className="adm-h1">Edit Project</h1>
      <p className="adm-sub">{project.title}</p>
      <ProjectForm
  initial={{
    id: project.id,
    category: project.category,
    type: project.type,
    title: project.title,
    description: project.description,
    tags: project.tags,
    image: project.image,
    link: project.link,
    order: project.order,
    published: project.published,
    featured: project.featured,
  }}
/>
    </>
  );
}
