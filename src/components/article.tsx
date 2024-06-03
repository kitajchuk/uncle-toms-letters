import type { Page, PostProps } from "@/types";

import { nanoid } from "nanoid";

import Translation from "@/components/translation";
import Attachments from "@/components/attachments";

const Article = ({ post }: PostProps) => {
  return (
    <article className="font-sans leading-loose px-5">
      <main className="container mx-auto max-w-screen-md">
        {post.pages.map((translation: Page) => {
          return <Translation key={nanoid()} id={post.id} page={translation} />;
        })}
      </main>
      {post.attachments.length > 0 ? <Attachments post={post} /> : null}
    </article>
  );
};

export default Article;
