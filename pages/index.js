import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/posts';

const Home = ({ allPostsData }) => {
  return (
    <Layout>
      <Head>
        <title>Uncle Tom's Letters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-center font-sans text-4xl py-36">
        <h1>Uncle Tom's Letters</h1>
      </header>
      <nav className="text-center font-sans">
        <div className="flex justify-center pb-36">
          <img src="/mail.svg" width="33" />
        </div>
        <ul>
          {allPostsData.map((post, i) => {
            return (
              <li key={post.id} className="leading-loose">
                <Link href={`/posts/${post.id}`}>
                  <a>
                    <div className="text-2xl">{post.title}</div>
                    <div>( {post.documents} documents, {post.translations} translations )</div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <section className="text-center font-sans py-36">
        <p>A work in progress...</p>
      </section>
    </Layout>
  )
};

export async function getStaticProps() {
  const allPostsData = getAllPosts();

  return {
    props: {
      allPostsData,
    },
  };
}

export default Home;
