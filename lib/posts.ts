import { prisma } from "@/lib/prisma";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  coverImage?: string | null;
}

export interface Post extends PostMeta {
  content: string;
}

/** Published posts only, newest first — used by the public site. */
export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return posts.map(toPostMeta);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !post.published) return null;
  return { ...toPostMeta(post), content: post.content };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => p.slug);
}

function toPostMeta(post: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  coverImage: string | null;
  publishedAt: Date | null;
  createdAt: Date;
}): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    date: (post.publishedAt ?? post.createdAt).toISOString(),
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime,
    author: post.author,
    coverImage: post.coverImage,
  };
}
