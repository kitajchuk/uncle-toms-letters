import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <header className="p-5 text-black font-mono">
        <Link href="/">
          <div className="cursor-pointer flex items-center">
            <Image
              src="/logo.svg"
              height={537 / 10}
              width={640 / 10}
              alt="Kitajchuk" />
          </div>
        </Link>
      </header>
      <nav></nav>
      <main className="pl-5 pr-5 pt-10 pb-10 font-mono">
        {children}
      </main>
      <footer className="p-5 font-mono text-black-500"></footer>
    </>
  );
}
