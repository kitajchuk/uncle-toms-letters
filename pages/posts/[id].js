import { useEffect, useState } from 'react';

import Layout from '../../src/components/layout';
import Masthead from '../../src/components/masthead';
import Timeline from '../../src/components/timeline';
import Article from '../../src/components/article';
import Linkback from '../../src/components/linkback';
import { formatDate } from '../../src/lib/date';
import { getBookmarked, addBookmark, removeBookmark } from '../../src/lib/bookmarks';
import { getAllPostIds, getAllPosts, getPostData } from '../../src/lib/posts';

export default function Post({post, posts}) {
  const text_d = post.documents > 1 ? 'documents' : 'document';
  const text_t = post.translations > 1 ? 'translations' : 'translation';
  const subtitle = `( ${post.documents} ${text_d}, ${post.translations} ${text_t} )`;

  const [bookmarked, setBookmarked] = useState(false);

  const onClickBookmark = () => {
    setBookmarked((bm) => {
      const newBm = !bm;

      if (newBm) {
        addBookmark(post);
      } else {
        removeBookmark(post);
      }

      return newBm;
    });
  };

  useEffect(() => {
    setBookmarked(() => {
      return getBookmarked(post);
    });

  }, [post]);

  return (
    <Layout title={formatDate(post.id)}>
      <Masthead title={formatDate(post.id)} subtitle={subtitle} recent={post.recent} />
      <div className="fixed top-5 right-5 z-10 cursor-pointer" onClick={onClickBookmark}>
        <img
          src={bookmarked ? '/svg/bookmark_saved.svg' : '/svg/bookmark.svg'}
          alt={bookmarked ? 'bookmark saved icon' : 'bookmark icon'}
          width="16"
          height="24"
        />
      </div>
      <div className="flex justify-center pb-20 sm:pb-36">
        <Linkback />
      </div>
      <Article post={post} />
      <Timeline posts={posts} open={true} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const post = getPostData(params.id);
  let posts = getAllPosts();
  const index = posts.indexOf(posts.find(p => p.id === params.id)) + 1;

  posts = posts.slice(index, posts.length);

  return {
    props: {
      post,
      posts,
    },
  };
}