import Link from "next/link";
import { useRouter } from "next/router";

const Navi = () => {
  const router = useRouter();
  const isAbout = router.route === "/about";
  const isBookmarks = router.route === "/bookmarks";

  return (
    <nav className="text-center font-sans text-sm sm:text-base font-light px-5 py-5">
      <Link href="/about" className={isAbout ? "underline" : ""} title="About">
        About
      </Link>
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <Link
        href="/bookmarks"
        className={isBookmarks ? "underline" : ""}
        title="Bookmarks"
      >
        Bookmarks
      </Link>
    </nav>
  );
};

export default Navi;
