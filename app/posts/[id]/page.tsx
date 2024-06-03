import type { PostProps, StaticParams, ParamsProps } from "@/types";

import Masthead from "@/components/masthead";
import Timeline from "@/components/timeline";
import Article from "@/components/article";
import Linkback from "@/components/linkback";
import Bookmark from "@/components/bookmark";
import { formatDate } from "@/lib/utils";
import { getAllPostIds, getAllPosts, getPostData } from "@/lib/posts";

export async function generateMetadata({ params }: ParamsProps) {
  return {
    title: formatDate(params.id),
  };
}

export async function generateStaticParams() {
  return getAllPostIds();
}

async function getPagePostAndPosts(params: StaticParams): Promise<PostProps> {
  const post = await getPostData(params.id);
  const posts = await getAllPosts();
  const index = posts.indexOf(posts.find((p) => p.id === params.id)) + 1;
  const rest = posts.slice(index, posts.length);

  return {
    post,
    posts: rest,
  };
}

export default async function Page({ params }: ParamsProps) {
  const { post, posts } = await getPagePostAndPosts(params);
  const text_d = post.documents > 1 ? "documents" : "document";
  const text_t = post.translations > 1 ? "translations" : "translation";
  const subtitle = `( ${post.documents} ${text_d}, ${post.translations} ${text_t} )`;

  return (
    <>
      <Masthead title={post.date} subtitle={subtitle} recent={post.recent} />
      <Bookmark post={post} />
      <div className="flex justify-center pb-20 sm:pb-36">
        <Linkback />
      </div>
      <Article post={post} />
      <Timeline posts={posts} open={true} />
    </>
  );
}
