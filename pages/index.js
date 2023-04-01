import Layout from "../src/components/layout";
import Masthead from "../src/components/masthead";
import Timeline from "../src/components/timeline";
import { getAllPosts } from "../src/lib/posts";

const Home = ({ posts }) => {
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

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default Home;
