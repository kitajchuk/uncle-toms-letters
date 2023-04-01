import { useEffect, useState } from "react";

import {
  getBookmarks,
  setBookmarks,
  addBookmark,
  removeBookmark,
  getBookmarked,
} from "../lib/bookmarks";

// HOC
// Usage: export default withBookmarks(LayoutComponent);
// https://reactjs.org/docs/higher-order-components.html
export function withBookmarks(WrappedComponent) {
  return function WrapperComponent({ ...props }) {
    useEffect(() => {
      const data = getBookmarks();

      if (!data) {
        setBookmarks([]);
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export const Bookmark = ({ post }) => {
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
    setBookmarked(() => {
      return getBookmarked(post);
    });
  }, [post]);

  return (
    <div
      className="fixed top-5 right-5 z-10 cursor-pointer"
      onClick={onClickBookmark}
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
