import { useEffect, useRef, useState } from 'react';

const AsyncImage = ({ src }) => {
  const imageRef = useRef();
  const scRef = useRef();
  const [loaded, setLoaded] = useState(false);

  const loadImage = () => {
    const img = new Image();

    img.onload = () => {
      imageRef.current.src = img.src;
      setLoaded(true);
    };

    img.src = src;
  };

  useEffect(() => {
    if (imageRef.current) {
      import('properjs-scrollcontroller').then((ScrollController) => {
        scRef.current = new ScrollController.default();

        scRef.current.on('scroll', () => {
          const bounds = imageRef.current.getBoundingClientRect();

          if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            loadImage();
            scRef.current.stop();
          }
        });
      });
    }

    return function cleanup() {
      if (scRef.current) {
        scRef.current.stop();
      }
    };

  }, [src]);

  return <img ref={imageRef} className={['utl-img'].concat(loaded ? 'is-loaded' : '').join(' ')} />;
};

export default AsyncImage;