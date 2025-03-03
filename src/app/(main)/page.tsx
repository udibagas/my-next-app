interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const metadata = {
  title: "Home | Next App",
  description: "Generated by create next app",
  keywords: ["next", "react", "typescript"],
}

export default async function Home() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts: Post[] = await response.json()


  return (
    <div className="p-8">
      <h1 className="text-3xl">Home</h1>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 border">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}