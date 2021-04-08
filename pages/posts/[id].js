import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import Masthead from '../../components/masthead';
import Timeline from '../../components/timeline';
import Article from '../../components/article';
import Linkback from '../../components/linkback';
import { formatDate } from '../../lib/date';
import { getBookmarked, addBookmark, removeBookmark } from '../../lib/bookmarks';
import { getAllPostIds, getAllPosts, getPostData } from '../../lib/posts';

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
    setBookmarked((bm) => {
      return getBookmarked(post);
    });

  }, [post]);

  return (
    <Layout title={formatDate(post.id)}>
      <Masthead title={formatDate(post.id)} subtitle={subtitle} />
      <div className="fixed top-5 right-5 z-10 cursor-pointer" onClick={onClickBookmark}>
        <img src={bookmarked ? "/svg/bookmark_saved.svg" : "/svg/bookmark.svg"} width="16" />
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

  // Maybe there's a better way to do this...?
  let index = 0;

  posts.find((json, i) => {
    if (json.id === params.id) {
      index = i + 1;
    }
  });

  posts = posts.slice(index, posts.length);

  return {
    props: {
      post,
      posts,
    },
  };
}