import Star from "@/components/star";

type MastheadProps = {
  title: string;
  subtitle: string;
  recent?: boolean;
};

const Masthead = ({ title, subtitle, recent = false }: MastheadProps) => {
  return (
    <header className="anim text-center font-sans py-20 sm:py-36 px-5 leading-loose">
      {recent ? (
        <div className="mb-5">
          <Star />
        </div>
      ) : null}
      <h1 className="text-3xl sm:text-4xl font-normal">{title}</h1>
      <h2 className="text-xl sm:text-2xl mt-5 font-light">{subtitle}</h2>
    </header>
  );
};

export default Masthead;
