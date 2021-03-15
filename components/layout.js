import Navi from './navi';
import Notifications from './notifications';
import { withBookmarks } from './bookmarks';

const Layout = ({children}) => {
  return (
    <>
      <Notifications />
      <Navi />
      {children}
    </>
  );
};

export default withBookmarks(Layout);