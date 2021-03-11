import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import Masthead from '../components/masthead';
import Timeline from '../components/timeline';
import { getBookmarks } from '../lib/bookmarks';

const Bookmarks = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getBookmarks());

  }, []);

  return (
    <Layout>
      <Head>
        <title>Bookmarks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Masthead title="Bookmarks" subtitle="Your saved posts" />
      <Timeline posts={posts} bookmarks={true} />
    </Layout>
  )
};

export default Bookmarks;
