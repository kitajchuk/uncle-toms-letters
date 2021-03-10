import Navi from './navi';
import BookmarkManager from './bookmarks';

export default function Layout({ children }) {
  return (
    <>
      <Navi />
      {children}
      <BookmarkManager />
    </>
  );
}
