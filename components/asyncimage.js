import { useEffect, useRef } from 'react';

const AsyncImage = ({src}) => {
  const imageRef = useRef();

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      if (imageRef.current) {
        imageRef.current.src = img.src;
      }
    };

    img.src = src;

  }, [src]);

  return <img ref={imageRef} />;
};

export default AsyncImage;