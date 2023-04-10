import Link from "next/link";

const Linkback = () => {
  return (
    <Link href="/">
      <a title="Back home" className="anim">
        <img src="/svg/mail.svg" width="33" height="27" alt="mail icon" />
      </a>
    </Link>
  );
};

export default Linkback;
