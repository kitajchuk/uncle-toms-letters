import type { PostProps } from "../types";

import { useEffect, useState } from "react";

import { addBookmark, removeBookmark, isBookmarked } from "../lib/bookmarks";

export const Bookmark = ({ post }: PostProps) => {
  const [bookmarked, setBookmarked] = useState(false);

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

  useEffect(() => {
    setBookmarked(isBookmarked(post));
  }, [post]);

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
};
