import Head from "next/head";
import Navi from "./navi";

import { withBookmarks } from "./bookmarks";
import { Animate } from "./animate";

const Layout = ({ children, title = "Uncle Tom's Letters" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="The story of Eva and Fritz." />
        <meta
          name="image"
          property="og:image"
          content="https://letters.kitajchuk.com/letters.png"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navi />
      <Animate>{children}</Animate>
    </>
  );
};

export default withBookmarks(Layout);
