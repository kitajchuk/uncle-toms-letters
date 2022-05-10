import Link from 'next/link';

import { nanoid } from 'nanoid';

import Star from './star';
import Linkback from './linkback';
import { formatDate } from '../lib/date';
import { Animate } from './animate';

const Timelink = ({post}) => {
  const text_d = post.documents > 1 ? 'documents' : 'document';
  const text_t = post.translations > 1 ? 'translations' : 'translation';

  return (
    <li className="mb-24">
      <Animate>
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
      </Animate>
    </li>
  );
};

const Booklink = () => {
  return (
    <li className="mb-24">
      <Animate>
        <div className="text-xl sm:text-2xl">Nothing saved.</div>
        <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
          <div className="mr-3">Use this icon</div>
          <img src="/svg/bookmark.svg" width="16" height="24" alt="bookmark icon" />
          <div className="ml-3">to save posts here.</div>
        </div>
      </Animate>
    </li>
  );
};

const Endlink = () => {
  return (
    <li className="mb-24">
      <Animate>
        <Link href="/">
          <a>
            <div className="text-xl sm:text-2xl">The end.</div>
            <div className="text-sm sm:text-base mt-2 font-light">( back to the beginning )</div>
          </a>
        </Link>
      </Animate>
    </li>
  );
};

const Envelope = () => {
  return (
    <Animate>
      <img src="/svg/mail_open.svg" width="33" height="39" alt="open mail icon" />
    </Animate>
  );
};

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
          return <Timelink key={nanoid()} post={post} />;
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