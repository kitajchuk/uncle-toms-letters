import type { NextPage } from "next";
import type { PostProps, StaticProps, Post } from "../../src/types";

import Layout from "../../src/components/layout";
import Masthead from "../../src/components/masthead";
import Timeline from "../../src/components/timeline";
import Article from "../../src/components/article";
import Linkback from "../../src/components/linkback";
import { Bookmark } from "../../src/components/bookmarks";
import { getAllPostIds, getAllPosts, getPostData } from "../../src/lib/posts";

const Post: NextPage = ({ post, posts }: PostProps) => {
  const text_d = post.documents > 1 ? "documents" : "document";
  const text_t = post.translations > 1 ? "translations" : "translation";
  const subtitle = `( ${post.documents} ${text_d}, ${post.translations} ${text_t} )`;

  return (
    <Layout title={post.date}>
      <Masthead title={post.date} subtitle={subtitle} recent={post.recent} />
      <Bookmark post={post} />
      <div className="flex justify-center pb-20 sm:pb-36">
        <Linkback />
      </div>
      <Article post={post} />
      <Timeline posts={posts} open={true} />
    </Layout>
  );
};

export default Post;

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }): Promise<StaticProps> {
  const post = await getPostData(params.id);
  let posts = await getAllPosts();
  const index = posts.indexOf(posts.find((p) => p.id === params.id)) + 1;

  posts = posts.slice(index, posts.length);

  return {
    props: {
      post,
      posts,
    },
  };
}
