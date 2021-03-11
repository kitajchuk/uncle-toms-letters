import Navi from './navi';
import Bookmarks from './bookmarks';

export default function Layout({children}) {
  return (
    <>
      <Navi />
      {children}
      <Bookmarks />
    </>
  );
}
