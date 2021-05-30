import Link from 'next/link';

import { withAnimate } from './animate';

const Linkback = () => {
  return (
    <Link href="/">
      <a title="Back home">
        <img src="/svg/mail.svg" width="33" />
      </a>
    </Link>
  );
};

export default withAnimate(Linkback);