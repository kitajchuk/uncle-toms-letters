import { useEffect, useRef } from 'react';

// The next/image component is neat, but kind of whack
// The requirement for width/height is a bit limiting...
// This could be refactored to load ONLY when in viewport!
// Much like the default of properjs-imageloader.
// const isVisible = (el) => {
//   const bounds = el.getBoundingClientRect();
//   return (bounds.top < window.innerHeight && bounds.bottom > 0);
// }
const AsyncImage = ({ src }) => {
  const imageRef = useRef();

  useEffect(() => {
    if (imageRef.current) {
      const img = new Image();
  
      img.onload = () => {
        imageRef.current.src = img.src;
      };
  
      img.src = src;
    }

    // return () => console.log('<Image>::teardown');

  }, [src]);

  return <img ref={imageRef} />;
};

export default AsyncImage;