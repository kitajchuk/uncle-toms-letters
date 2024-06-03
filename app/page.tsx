import Masthead from "@/components/masthead";
import Timeline from "@/components/timeline";
import { getAllPosts } from "@/lib/posts";

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <>
      <Masthead
        title="Uncle Tom's Letters"
        subtitle="The Story of Eva and Fritz"
      />
      <Timeline posts={posts} open={false} />
    </>
  );
}
