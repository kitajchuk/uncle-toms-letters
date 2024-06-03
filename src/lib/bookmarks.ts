"use client";

import { useEffect, useState } from "react";

import type { BasePost, Post } from "@/types";

// LocalStorage access key...
const store = "utl-bookmarks";

export function useBookmarks() {
  const [posts, setPosts] = useState<BasePost[]>([]);

  useEffect(() => {
    setPosts(getBookmarks());
  }, []);

  return posts;
}

export function useIsBookmarked(
  post: Post
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(post));
  }, [post]);

  return [bookmarked, setBookmarked];
}

export function setBookmarks(posts: BasePost[]) {
  return window.localStorage.setItem(store, JSON.stringify(posts));
}

export function getBookmarks(): BasePost[] | null {
  const posts = window.localStorage.getItem(store);
  return posts ? JSON.parse(posts) : [];
}

export function isBookmarked(post: Post) {
  const posts = getBookmarks();
  return posts.some((bm) => bm.id === post.id);
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
  setBookmarks(posts.filter((bm) => bm.id !== post.id));
}
