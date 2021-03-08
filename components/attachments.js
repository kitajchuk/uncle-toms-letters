const Attachments = ({ post }) => {
  return (
    <aside className="container mx-auto max-w-screen-lg px-10 sm:px-0 pb-36 grid gap-y-16 sm:gap-y-0 sm:grid-cols-2 sm:gap-x-16">
      {post._documents.map((doc) => {
        return (
          <img src={`/posts/${post.id}/${doc}`} />
        );
      })}
    </aside>
  );
};

export default Attachments;