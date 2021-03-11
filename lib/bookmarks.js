// LocalStorage access key...
const store = 'utl-bookmarks';

export function setBookmarks(data) {
  return window.localStorage.setItem(store, JSON.stringify(data));
}

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

    // Only what we need for render in LocalStorage...
    data.push({
      id: post.id,
      documents: post.documents,
      translations: post.translations,
    });

    setBookmarks(data);
  }
};

export function removeBookmark(post) {
  const data = getBookmarks();
  const found = data.find((bm) => {
    return (bm.id === post.id);
  });

  if (found) {
    data.splice(data.indexOf(found), 1);

    setBookmarks(data);
  }
};