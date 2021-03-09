import AsyncImage from './asyncimage';

const Attachments = ({ post }) => {
  return (
    <aside className="container mx-auto max-w-screen-md px-10 sm:px-0 pb-28 sm:pb-36">
      <div className="text-center text-xl pb-12 sm:pb-16 sm:text-2xl">Attachments</div>
      <div className="grid grid-cols-1 gap-10 justify-items-center">
        {post.attachments.map((doc) => {
          return (
            <AsyncImage src={`/posts/${post.id}/${doc}`} />
          );
        })}
      </div>
    </aside>
  );
};

export default Attachments;