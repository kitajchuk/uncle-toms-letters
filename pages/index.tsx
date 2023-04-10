import type { NextPage } from "next";
import type { TimelineProps, StaticProps } from "../src/types";

import Layout from "../src/components/layout";
import Masthead from "../src/components/masthead";
import Timeline from "../src/components/timeline";
import { getAllPosts } from "../src/lib/posts";

const Home: NextPage = ({ posts }: TimelineProps) => {
  return (
    <Layout>
      <Masthead
        title="Uncle Tom's Letters"
        subtitle="The Story of Eva and Fritz"
      />
      <Timeline posts={posts} open={false} />
    </Layout>
  );
};

export async function getStaticProps(): Promise<StaticProps> {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default Home;
