import Link from 'next/link';
import { useRouter } from 'next/router';

const Navi = () => {
  const router = useRouter();
  const isAbout = (router.route === '/about');
  const isBookmarks = (router.route === '/bookmarks');

  return (
    <nav className="text-center font-sans text-sm sm:text-base font-light px-5 py-5">
      <Link href="/bookmarks">
        <a className={isBookmarks ? 'underline' : ''} title="Bookmarks">Bookmarks</a>
      </Link>
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <Link href="/about">
        <a className={isAbout ? 'underline' : ''} title="About">About</a>
      </Link>
    </nav>
  );
};

export default Navi;