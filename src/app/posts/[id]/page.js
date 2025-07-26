export async function generateStaticParams() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const posts = await res.json();

  return posts.map((post) => ({
    id: String(post.id),
  }));
}

const page = async ({ params }) => {
  const id = (await params).id;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  console.log("This is rendering when user reloads");
  return (
    <div>
      <h3>Post Id {id}</h3>
      <h1>Post title : {post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default page;
