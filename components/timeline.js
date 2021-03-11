import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Star from './star';
import Linkback from './linkback';
import { formatDate } from '../lib/date';

const Timeline = ({ posts, open = false, bookmarks = false }) => {
  const listRef = useRef();
  const scRef = useRef();

  useEffect(() => {
    if (listRef.current) {
      import('properjs-scrollcontroller').then((ScrollController) => {
        scRef.current = new ScrollController.default();

        scRef.current.on('scroll', () => {
          const elements = document.querySelectorAll('.utl-timeline li:not(.is-animated)');

          if (elements.length) {
            elements.forEach((el) => {
              const bounds = el.getBoundingClientRect();

              if (bounds.top < window.innerHeight && bounds.bottom > 0) {
                el.classList.add('is-animated');
              }
            });
          } else {
            scRef.current.stop();
          }
        });
      });
    }

    return function cleanup() {
      if (scRef.current) {
        scRef.current.stop();
      }
    };

  }, []);

  return (
    <nav className="utl-timeline text-center font-sans leading-loose px-5">
      <div className="flex justify-center pb-28 sm:pb-36">
        {open ? (
          <img src="/mail_open.svg" width="33" />
        ) : (
          <Linkback />
        )}
      </div>
      <ul ref={listRef}>
        {posts.length ? posts.map((post) => {
          const text_d = post.documents > 1 ? 'documents' : 'document';
          const text_t = post.translations > 1 ? 'translations' : 'translation';

          return (
            <li key={post.id} className="mb-24">
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
        }) : bookmarks ? (
          <li className="mb-24">
            <div className="text-xl sm:text-2xl">Nothing saved.</div>
            <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
                <div className="mr-3">Use this icon</div>
                <img src="/bookmark.svg" width="16" />
                <div className="ml-3">to save posts here.</div>
            </div>
          </li>
        ) : (
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