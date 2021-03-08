import Translation from './translation';
import Attachments from './attachments';

const Article = ({ post }) => {
  const hasAttachments = post._documents.length;

  return (
    <article className="font-sans leading-loose px-5">
      <main className="container mx-auto max-w-screen-md">
        {post._translations.map((translation) => {
          return (
            <Translation id={post.id} data={translation} />
          );
        })}
      </main>
      {hasAttachments ? (
        <Attachments post={post} />
      ) : null}
    </article>
  );
};

export default Article;