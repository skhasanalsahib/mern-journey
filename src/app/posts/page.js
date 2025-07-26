import Link from "next/link";

const page = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const posts = await response.json();
  console.log("Log From Server");

  return (
    <div>
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            {index + 1} <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
