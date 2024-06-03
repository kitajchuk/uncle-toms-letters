"use client";

import type { PostProps } from "@/types";

import { addBookmark, removeBookmark, useIsBookmarked } from "@/lib/bookmarks";

export default function Bookmark({ post }: PostProps) {
  const [bookmarked, setBookmarked] = useIsBookmarked(post);

  const onClickBookmark = () => {
    setBookmarked((bm) => {
      const newBm = !bm;

      if (newBm) {
        addBookmark(post);
      } else {
        removeBookmark(post);
      }

      return newBm;
    });
  };

  return (
    <div
      onClick={onClickBookmark}
      className="fixed top-5 right-5 z-10 cursor-pointer"
    >
      <img
        src={bookmarked ? "/svg/bookmark_saved.svg" : "/svg/bookmark.svg"}
        alt={bookmarked ? "bookmark saved icon" : "bookmark icon"}
        width="16"
        height="24"
      />
    </div>
  );
}
