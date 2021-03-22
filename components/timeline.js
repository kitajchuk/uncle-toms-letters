import Link from 'next/link';
import Star from './star';
import Linkback from './linkback';
import { formatDate } from '../lib/date';
import { withAnimate } from './animate';

const Timelink = withAnimate(({post}) => {
  const text_d = post.documents > 1 ? 'documents' : 'document';
  const text_t = post.translations > 1 ? 'translations' : 'translation';

  return (
    <li className="mb-24">
      <Link href={`/posts/${post.id}`}>
        <a>
          {post.recent ? (
            <Star />
          ) : null}
          <div className="text-xl sm:text-2xl">
            {formatDate(post.id)}
          </div>
          <div className="text-sm sm:text-base mt-2 font-light">( {post.documents} {text_d}, {post.translations} {text_t} )</div>
        </a>
      </Link>
    </li>
  );
});

const Booklink = withAnimate(() => {
  return (
    <li className="mb-24">
      <div className="text-xl sm:text-2xl">Nothing saved.</div>
      <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
        <div className="mr-3">Use this icon</div>
        <img src="/svg/bookmark.svg" width="16" />
        <div className="ml-3">to save posts here.</div>
      </div>
    </li>
  );
});

const Endlink = withAnimate(() => {
  return (
    <li className="mb-24">
      <Link href="/">
        <a>
          <div className="text-xl sm:text-2xl">The end.</div>
          <div className="text-sm sm:text-base mt-2 font-light">( back to the beginning )</div>
        </a>
      </Link>
    </li>
  );
});

const Envelope = withAnimate(() => {
  return <img src="/svg/mail_open.svg" width="33" />;
});

const Timeline = ({posts, open = false, bookmarks = false}) => {
  return (
    <nav className="text-center font-sans leading-loose px-5">
      <div className="flex justify-center pb-20 sm:pb-36">
        {open ? (
          <Envelope />
        ) : (
          <Linkback />
        )}
      </div>
      <ul>
        {posts.length ? posts.map((post) => {
          return <Timelink key={post.id} post={post} />
        }) : bookmarks ? (
          <Booklink />
        ) : (
          <Endlink />
        )}
      </ul>
    </nav>
  );
};

export default Timeline;