import Navi from './navi';
import { withBookmarks } from './bookmarks';

const Layout = ({children}) => {
  return (
    <>
      <Navi />
      {children}
    </>
  );
};

export default withBookmarks(Layout);