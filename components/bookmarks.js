import { useEffect } from 'react';

import { getBookmarks, setBookmarks } from '../lib/bookmarks';

// HOC
// Usage: export default withBookmarks(LayoutComponent);
// https://reactjs.org/docs/higher-order-components.html
export function withBookmarks(WrappedComponent) {
  return function WrapperComponent({...props}) {
    useEffect(() => {
      const data = getBookmarks();

      if (!data) {
        setBookmarks([]);
      }

    }, []);

    return <WrappedComponent {...props} />;
  };
}