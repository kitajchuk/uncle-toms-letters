import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// HOC
// Usage: export default withAnimate(SomeComponent);
// https://reactjs.org/docs/higher-order-components.html
export function withAnimate(WrappedComponent) {
  return function WrapperComponent({...props}) {
    const elRef = useRef();
    const scRef = useRef();
    const [animated, setAnimated] = useState(false);
    const classes = {
      'anim': true,
      'is-animated': animated,
    };

    useEffect(() => {
      if (elRef.current) {
        import('properjs-scrollcontroller').then((ScrollController) => {
          scRef.current = new ScrollController.default();

          scRef.current.on('scroll', () => {
            if (elRef.current) {
              const bounds = elRef.current.getBoundingClientRect();

              if (bounds.top < window.innerHeight && bounds.bottom > 0) {
                scRef.current.stop();
                scRef.current.off('scroll');
                setAnimated(true);
              }
            }
          });
        });
      }

      return function cleanup() {
        if (scRef.current) {
          scRef.current.stop();
          scRef.current.off('scroll');
        }
      };
    }, [elRef, scRef]);

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