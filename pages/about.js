import Layout from '../src/components/layout';
import Masthead from '../src/components/masthead';
import Linkback from '../src/components/linkback';
import { withAnimate } from '../src/components/animate';

const Notes = withAnimate(() => {
  return (
    <ul className="text-center font-sans leading-loose px-5">
      <li className="mb-24">
        <div className="text-xl sm:text-2xl">
          A true story
        </div>
        <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
          Being translated and archived with care.
        </div>
      </li>
      <li className="mb-24">
        <div className="text-xl sm:text-2xl">
          Anywhere you are
        </div>
        <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
          <div className="mr-3">Tap/click the</div>
          <img src="/svg/mail.svg" width="24" height="20" alt="mail icon" />
          <div className="ml-3">icon to return home.</div>
        </div>
      </li>
      <li className="mb-24">
        <div className="text-xl sm:text-2xl">Bookmarking posts</div>
        <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
          <div className="mr-3">Tap/click the</div>
          <img src="/svg/bookmark.svg" width="16" height="24" alt="bookmark icon" />
          <div className="ml-3">icon to bookmark posts.</div>
        </div>
        <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
          <div className="mr-3">This</div>
          <img src="/svg/bookmark_saved.svg" width="16" height="24" alt="bookmark saved icon" />
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
          The latest translations
        </div>
        <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
          <div className="mr-3">Posts with a</div>
          <img src="/svg/star.svg" width="24" height="24" alt="star icon" />
          <div className="ml-3">icon were recently added.</div>
        </div>
      </li>
      <li className="mb-24">
        <div className="text-xl sm:text-2xl">
          Made with Love
        </div>
        <div className="text-sm sm:text-base mt-2 font-light">
          &mdash;The Kitajchuk&rsquo;s
        </div>
      </li>
    </ul>
  );
});

const About = () => {
  return (
    <Layout title="About">
      <Masthead title="About" subtitle="Uncle Tom's Letters" />
      <div className="flex justify-center pb-20 sm:pb-36">
        <Linkback />
      </div>
      <Notes />
    </Layout>
  );
};

export default About;
