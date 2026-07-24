import PostForm from "../PostForm";

export default function NewPostPage() {
  return (
    <>
      <h1 className="adm-h1">New Post</h1>
      <p className="adm-sub">Write a new blog article.</p>
      <PostForm />
    </>
  );
}
