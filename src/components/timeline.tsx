import type { BasePost } from "../types";

import Link from "next/link";

import { nanoid } from "nanoid";

import Star from "./star";
import Linkback from "./linkback";

type TimelinkProps = {
  post: BasePost;
};

const Timelink = ({ post }: TimelinkProps) => {
  const text_d = post.documents > 1 ? "documents" : "document";
  const text_t = post.translations > 1 ? "translations" : "translation";

  return (
    <li className="mb-24">
      <Link href={`/posts/${post.id}`}>
        <a className="anim block">
          {post.recent ? <Star /> : null}
          <div className="text-xl sm:text-2xl">{post.date}</div>
          <div className="text-sm sm:text-base mt-2 font-light">
            ( {post.documents} {text_d}, {post.translations} {text_t} )
          </div>
        </a>
      </Link>
    </li>
  );
};

const Booklink = () => {
  return (
    <li className="mb-24">
      <div className="anim">
        <div className="text-xl sm:text-2xl">Nothing saved.</div>
        <div className="flex justify-center text-sm sm:text-base mt-2 font-light">
          <div className="mr-3">Use this icon</div>
          <img
            src="/svg/bookmark.svg"
            width="16"
            height="24"
            alt="bookmark icon"
          />
          <div className="ml-3">to save posts here.</div>
        </div>
      </div>
    </li>
  );
};

const Endlink = () => {
  return (
    <li className="mb-24">
      <Link href="/">
        <a className="anim block">
          <div className="text-xl sm:text-2xl">The end.</div>
          <div className="text-sm sm:text-base mt-2 font-light">
            ( back to the beginning )
          </div>
        </a>
      </Link>
    </li>
  );
};

const Envelope = () => {
  return (
    <img
      src="/svg/mail_open.svg"
      width="33"
      height="39"
      alt="open mail icon"
      className="anim"
    />
  );
};

type TimelineProps = {
  open?: boolean;
  posts: BasePost[];
  bookmarks?: boolean;
};

const Timeline = ({
  posts,
  open = false,
  bookmarks = false,
}: TimelineProps) => {
  return (
    <nav className="text-center font-sans leading-loose px-5">
      <div className="flex justify-center pb-20 sm:pb-36">
        {open ? <Envelope /> : <Linkback />}
      </div>
      <ul>
        {posts.length ? (
          posts.map((post) => {
            return <Timelink key={nanoid()} post={post} />;
          })
        ) : bookmarks ? (
          <Booklink />
        ) : (
          <Endlink />
        )}
      </ul>
    </nav>
  );
};

export default Timeline;
