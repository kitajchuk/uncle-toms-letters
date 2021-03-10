import Link from 'next/link';

const Linkback = () => {
  return (
    <Link href="/">
      <a title="Back home">
        <img src="/mail.svg" width="33" />
      </a>
    </Link>
  );
};

export default Linkback;