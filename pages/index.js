import Head from 'next/head';
import Layout from '../components/layout';
import Masthead from '../components/masthead';
import Timeline from '../components/timeline';
import { getAllPosts } from '../lib/posts';

const Home = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>Uncle Tom's Letters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Masthead title="Uncle Tom's Letters" subtitle="A World War II Era Family History Project" />
      <Timeline posts={posts} open={false} />
    </Layout>
  )
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
