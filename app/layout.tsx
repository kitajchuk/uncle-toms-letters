import "tailwindcss/tailwind.css";
import "@/styles/global.css";
import Navi from "@/components/navi";
import Animate from "@/components/animate";

export const metadata = {
  title: {
    default: "Uncle Tom's Letters",
    template: "%s | Uncle Tom's Letters",
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        {/* title comes from page metadata */}
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
      </head>
      <body>
        <Navi />
        {children}
        <Animate />
      </body>
    </html>
  );
}
