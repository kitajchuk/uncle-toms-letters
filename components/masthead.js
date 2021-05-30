import { withAnimate } from './animate';

const Masthead = ({title, subtitle}) => {
  return (
    <header className="text-center font-sans py-20 sm:py-36 px-5 leading-loose">
      <h1 className="text-3xl sm:text-4xl font-normal">{title}</h1>
      <h2 className="text-xl sm:text-2xl mt-5 font-light">{subtitle}</h2>
    </header>
  );
};

export default withAnimate(Masthead);