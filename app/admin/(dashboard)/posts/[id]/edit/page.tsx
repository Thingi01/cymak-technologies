import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "../../PostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <>
      <h1 className="adm-h1">Edit Post</h1>
      <p className="adm-sub">{post.title}</p>
      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          readTime: post.readTime,
          author: post.author,
          coverImage: post.coverImage,
          published: post.published,
        }}
      />
    </>
  );
}
