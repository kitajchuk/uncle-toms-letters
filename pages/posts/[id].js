import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

const Translation = ({ id, data }) => {
  const [english, setEnglish] = useState(true);

  const onClickLang = (e) => {
    setEnglish(!english);
  };

  const renderText = (texts) => {
    return texts.map((text) => {
      return (
        <p className="my-4">{text}</p>
      );
    });
  };

  return (
    <section className="leading-loose pb-36 px-5">
      <div className="text-2xl">{data.title}</div>
      <div className="text-lg mt-2">
        {english ? (
          <>
            <span className="font-bold">English</span> | <span className="cursor-pointer" onClick={onClickLang}>German</span>
          </>
        ) : (
          <>
              <span className="cursor-pointer" onClick={onClickLang}>English</span> | <span className="font-bold">German</span>
          </>
        )}
      </div>
      <div>
        {english ? renderText(data.english) : renderText(data.german)}
      </div>
      <div className="mt-10">
        <img src={`/posts/${id}/${data.document}`} />
      </div>
    </section>
  );
};

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <header className="text-center font-sans py-36 leading-loose">
        <h1 className="text-4xl">{post.title}</h1>
        <div className="text-2xl mt-5">( {post.documents} documents, {post.translations} translations )</div>
      </header>
      {post._documents ? (
        <section className="container mx-auto max-w-screen-xl grid grid-cols-2 gap-x-16 px-5 xl:gap-x-32">
          {post._documents.map((doc) => {
            return (
              <img src={`/posts/${post.id}/${doc}`} />
            );
          })}
        </section>
      ) : null}
      <article className="container mx-auto max-w-screen-md font-sans py-36 leading-loose">
        {post._translations.map((translation) => {
          return (
            <Translation id={post.id} data={translation} />
          );
        })}
      </article>
      <section className="text-center font-sans py-36">
        <Link href="/">
          <a>Back to timeline...</a>
        </Link>
      </section>
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

  return {
    props: {
      post,
    },
  };
}