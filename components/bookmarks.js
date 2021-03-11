import { useEffect } from 'react';
import { getBookmarks, setBookmarks } from '../lib/bookmarks';

// Creates the initial LocalStorage save...
// Better way to do this?
const Bookmarks = () => {
  useEffect(() => {
    const data = getBookmarks();

    if (!data) {
      setBookmarks([]);
    }

  }, []);

  return null;
};

export default Bookmarks;