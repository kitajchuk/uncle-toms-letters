import type { PostProps } from "../types";

import Image from "./image";

const Attachments = ({ post }: PostProps) => {
  return (
    <aside className="anim container mx-auto max-w-screen-md px-10 sm:px-0 pb-20 sm:pb-36">
      <div className="text-center text-xl pb-12 sm:pb-16 sm:text-2xl">
        Attachments
      </div>
      <div className="grid grid-cols-1 gap-10 justify-items-center">
        {post.attachments.map((doc) => {
          return (
            <Image
              key={doc.src}
              src={doc.src}
              alt=""
              width={doc.dims.width}
              height={doc.dims.height}
              aspect={doc.aspect}
              orientation={doc.orientation}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Attachments;
