import { useEffect, useState } from 'react';

import Layout from '../src/components/layout';
import Masthead from '../src/components/masthead';
import Timeline from '../src/components/timeline';
import { getBookmarks } from '../src/lib/bookmarks';

const Bookmarks = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getBookmarks());

  }, []);

  return (
    <Layout title="Bookmarks">
      <Masthead title="Bookmarks" subtitle="Your saved posts" />
      <Timeline posts={posts} bookmarks={true} />
    </Layout>
  );
};

export default Bookmarks;
