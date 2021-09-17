import Layout from '../components/layout';
import Masthead from '../components/masthead';
import Timeline from '../components/timeline';
import { getAllPosts } from '../lib/posts';

const Home = ({posts}) => {
  return (
    <Layout>
      <Masthead title="Uncle Tom's Letters" subtitle="The Story of Eva and Fritz" />
      <Timeline posts={posts} open={false} />
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default Home;
