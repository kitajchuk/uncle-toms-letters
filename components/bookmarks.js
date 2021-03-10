import { useEffect } from 'react';

const store = 'utl-bookmarks';

const setBookmarks = (data) => {
  return window.localStorage.setItem(store, JSON.stringify(data));
};

export function getBookmarks() {
  const data = window.localStorage.getItem(store);
  return data ? JSON.parse(data) : null;
}

export function getBookmarked(post) {
  const data = getBookmarks();
  return data.find((bm) => {
    return (bm.id === post.id);
  }) ? true : false;
};

export function addBookmark(post) {
  if (!getBookmarked(post)) {
    const data = getBookmarks();

    data.push({
      id: post.id,
      documents: post.documents,
      translations: post.translations,
      recent: post.recent,
    });

    setBookmarks(data);
  }
};

export function removeBookmark(post) {
  if (getBookmarked(post)) {
    const data = getBookmarks();
    const found = data.find((bm) => {
      return (bm.id === post.id);
    });

    data.splice(data.indexOf(found), 1);

    setBookmarks(data);
  }
};

const BookmarkManager = ({}) => {
  useEffect(() => {
    const data = getBookmarks();

    if (!data) {
      setBookmarks([]);
    }

  }, []);

  return <></>;
};

export default BookmarkManager;