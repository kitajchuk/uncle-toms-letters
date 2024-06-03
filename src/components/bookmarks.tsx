"use client";

import Masthead from "@/components/masthead";
import Timeline from "@/components/timeline";
import Animate from "@/components/animate";
import { useBookmarks } from "@/lib/bookmarks";

export default function Bookmarks() {
  const posts = useBookmarks();

  return (
    <>
      <Masthead title="Bookmarks" subtitle="Your saved posts" />
      <Timeline posts={posts} bookmarks={true} />
      <Animate posts={posts} />
    </>
  );
}
