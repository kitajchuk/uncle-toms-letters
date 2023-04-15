import type { BasePost, Post } from "../types";

// LocalStorage access key...
const store = "utl-bookmarks";

export function setBookmarks(posts: BasePost[]) {
  return window.localStorage.setItem(store, JSON.stringify(posts));
}

export function getBookmarks(): BasePost[] | null {
  const posts = window.localStorage.getItem(store);
  return posts ? JSON.parse(posts) : null;
}

export function isBookmarked(post: Post) {
  const posts = getBookmarks();
  return posts.find((bm) => bm.id === post.id) ? true : false;
}

export function addBookmark(post: Post) {
  if (!isBookmarked(post)) {
    const posts = getBookmarks();
    const { id, date, recent, documents, translations } = post;

    // Only what we need for render in LocalStorage...
    posts.push({
      id,
      date,
      recent,
      documents,
      translations,
    });

    setBookmarks(posts);
  }
}

export function removeBookmark(post: Post) {
  const posts = getBookmarks();
  const found = posts.find((bm) => bm.id === post.id);

  if (found) {
    posts.splice(posts.indexOf(found), 1);
    setBookmarks(posts);
  }
}
