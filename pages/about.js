import Head from 'next/head';
import Layout from '../components/layout';
import Masthead from '../components/masthead';
import Linkback from '../components/linkback';

const Bookmarks = () => {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Masthead title="About" subtitle="Uncle Tom's Letters" />
      <div className="flex justify-center pb-20 sm:pb-36">
        <Linkback />
      </div>
      <ul className="text-center font-sans leading-loose px-5">
        <li className="mb-24">
          <div className="text-xl sm:text-2xl">
            The main timeline
          </div>
          <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
            <div className="mr-3">Tap/click the</div>
              <img src="/mail.svg" width="24" />
            <div className="ml-3">icon to return home.</div>
          </div>
        </li>
        <li className="mb-24">
          <div className="text-xl sm:text-2xl">Bookmarking posts</div>
          <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
            <div className="mr-3">Use the</div>
            <img src="/bookmark.svg" width="16" />
            <div className="ml-3">icon to bookmark posts.</div>
          </div>
          <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
            <div className="mr-3">This</div>
            <img src="/bookmark_saved.svg" width="16" />
            <div className="ml-3">means the post is bookmarked.</div>
          </div>
        </li>
        <li className="mb-24">
          <div className="text-xl sm:text-2xl">
            Your place in time
          </div>
          <div className="text-sm sm:text-base mt-2 font-light">
            While on a post the proceeding timeline <br />will begin with the next chronological post date.
          </div>
        </li>
        <li className="mb-24">
          <div className="text-xl sm:text-2xl">
            Made with Love
          </div>
          <div className="text-sm sm:text-base mt-2 font-light">
            &mdash;The Kitajchuk's
          </div>
        </li>
      </ul>
    </Layout>
  )
};

export default Bookmarks;
