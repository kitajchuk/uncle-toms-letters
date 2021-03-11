import { useEffect, useRef, useState } from 'react';

const AsyncImage = ({src}) => {
  const imageRef = useRef();

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      imageRef.current.src = img.src;
    };

    img.src = src;

  }, [src]);

  return <img ref={imageRef} />;
};

export default AsyncImage;