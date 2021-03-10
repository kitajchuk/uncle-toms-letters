import Link from 'next/link';
import { useRouter } from 'next/router';

const Navi = () => {
  const router = useRouter();
  const isBookmarks = (router.route === '/bookmarks');

  return (
    <nav className="text-center font-sans text-sm sm:text-base font-light px-5 py-5">
      {isBookmarks ? (
        <Link href="/">
          <a className="underline" title="Home">Home</a>
        </Link>
      ) : (
        <Link href="/bookmarks">
          <a className="underline" title="Bookmarks">Bookmarks</a>
        </Link>
      )}
    </nav>
  );
};

export default Navi;