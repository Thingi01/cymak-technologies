import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeletePostButton from "./DeletePostButton";

export default async function PostsListPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <div className="adm-row">
        <div>
          <h1 className="adm-h1">Blog Posts</h1>
          <p className="adm-sub" style={{ marginBottom: 0 }}>Manage articles shown on your public blog.</p>
        </div>
        <Link href="/admin/posts/new" className="adm-btn">+ New Post</Link>
      </div>

      <div className="adm-card">
        {posts.length === 0 ? (
          <p className="adm-empty">No posts yet. Create your first one.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{post.title}</div>
                    <div style={{ fontSize: "0.76rem", color: "rgba(18,33,27,0.4)" }}>/blog/{post.slug}</div>
                  </td>
                  <td>{post.category}</td>
                  <td>
                    <span className={`adm-badge ${post.published ? "adm-badge-published" : "adm-badge-draft"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{post.updatedAt.toLocaleDateString()}</td>
                  <td style={{ display: "flex", gap: "0.5rem" }}>
                    <Link href={`/admin/posts/${post.id}/edit`} className="adm-btn adm-btn-outline adm-btn-sm">Edit</Link>
                    <DeletePostButton id={post.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}