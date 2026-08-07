import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "../../TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <>
      <h1 className="adm-h1">Edit Testimonial</h1>
      <p className="adm-sub">{testimonial.clientName} — {testimonial.company}</p>
      <TestimonialForm
        initial={{
          id: testimonial.id,
          clientName: testimonial.clientName,
          role: testimonial.role ?? "",
          company: testimonial.company,
          quote: testimonial.quote,
          photo: testimonial.photo,
          published: testimonial.published,
          order: testimonial.order,
        }}
      />
    </>
  );
}