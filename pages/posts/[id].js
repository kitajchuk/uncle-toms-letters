import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import Masthead from '../../components/masthead';
import Timeline from '../../components/timeline';
import Article from '../../components/article';
// import ImageController from '../../components/imagecontroller';
import { getAllPostIds, getAllPosts, getPostData } from '../../lib/posts';

export default function Post({ post, posts }) {
  const text_d = post.documents > 1 ? 'documents' : 'document';
  const text_t = post.translations > 1 ? 'translations' : 'translation';
  const subtitle = `( ${post.documents} ${text_d}, ${post.translations} ${text_t} )`;

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Masthead title={post.title} subtitle={subtitle} />
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

export async function getStaticProps({ params }) {
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