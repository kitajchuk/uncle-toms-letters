import Translation from './translation';
import Attachments from './attachments';

const Article = ({post}) => {
  return (
    <article className="font-sans leading-loose px-5">
      <main className="container mx-auto max-w-screen-md">
        {post.pages.map((translation) => {
          return <Translation id={post.id} data={translation} />;
        })}
      </main>
      {post.attachments ? (
        <Attachments post={post} />
      ) : null}
    </article>
  );
};

export default Article;