import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import Masthead from '../components/masthead';
import Timeline from '../components/timeline';
import { getBookmarks } from '../components/bookmarks';

const Bookmarks = ({}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(() => {
      return getBookmarks();
    });

  }, []);

  return (
    <Layout>
      <Head>
        <title>Bookmarks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Masthead title="Bookmarks" subtitle="Saved posts" />
      <Timeline posts={posts} bookmarks={true} />
    </Layout>
  )
};

export default Bookmarks;
