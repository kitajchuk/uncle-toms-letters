import Link from 'next/link';
import { formatDate } from '../lib/date';

const Timeline = ({ posts, open }) => {
  return (
    <nav className="text-center font-sans leading-loose px-5">
      <div className="flex justify-center pb-28 sm:pb-36">
        {open ? (
          <img src="/mail_open.svg" width="33" />
        ) : (
          <img src = "/mail.svg" width = "33" />
        )}
      </div>
      <ul>
        {posts.length ? posts.map((post) => {
          const text_d = post.documents > 1 ? 'documents' : 'document';
          const text_t = post.translations > 1 ? 'translations' : 'translation';

          return (
            <li key={post.id} className="mb-24">
              <Link href={`/posts/${post.id}`}>
                <a>
                  <div className="text-xl sm:text-2xl">
                    {formatDate(post.id)}
                  </div>
                  <div className="text-sm sm:text-base mt-2 font-light">( {post.documents} {text_d}, {post.translations} {text_t} )</div>
                </a>
              </Link>
            </li>
          );
        }) : (
            <li className="mb-24">
              <Link href="/">
                <a>
                  <div className="text-xl sm:text-2xl">The end.</div>
                  <div className="text-sm sm:text-base mt-2 font-light">( back to the beginning )</div>
                </a>
              </Link>
            </li>
        )}
      </ul>
    </nav>
  );
};

export default Timeline;