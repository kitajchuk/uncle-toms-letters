import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

export function withAnimate(WrappedComponent) {
  return function WrapperComponent({...props}) {
    const elRef = useRef();
    const obRef = useRef();
    const [animated, setAnimated] = useState(false);
    const classes = {
      'anim': true,
      'is-animated': animated,
    };

    useEffect(() => {
      if (elRef.current) {
        obRef.current = new IntersectionObserver((entries) => {
          if (entries[ 0 ].isIntersecting) {
            obRef.current.disconnect();
            setAnimated(true);
          }
        });

        obRef.current.observe(elRef.current);
      }

      return function cleanup() {
        if (obRef.current) {
          obRef.current.disconnect();
        }
      };
    }, []);

    return (
      <div ref={elRef} className={classNames(classes)}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

export const Animate = withAnimate((props) => {
  return props.children;
});