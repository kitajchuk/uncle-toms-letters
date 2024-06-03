import type { Orientation } from "@/types";

type ImageProps = {
  src: string;
  alt?: string;
  aspect?: number;
  priority?: boolean;
  orientation?: Orientation;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Image = ({
  src,
  alt,
  aspect = 75,
  priority = false,
  orientation = "landscape",
  ...rest
}: ImageProps) => {
  const srcAlt = src.split("/").pop();

  return (
    <div className={`image image--${orientation}`}>
      <div className="image__fit" style={{ paddingBottom: `${aspect}%` }}>
        <img
          src={src}
          alt={alt || srcAlt}
          loading={priority ? "eager" : "lazy"}
          className="image__img"
          {...rest}
        />
      </div>
    </div>
  );
};

export default Image;
