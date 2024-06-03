import Masthead from "@/components/masthead";
import Linkback from "@/components/linkback";

export const metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <>
      <Masthead title="Oops" subtitle="This page doesn't exist" />
      <div className="flex justify-center pb-20 sm:pb-36">
        <Linkback />
      </div>
    </>
  );
}
