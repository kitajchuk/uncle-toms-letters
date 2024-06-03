import Navi from "@/components/navi";
import Animate from "@/components/animate";

type Props = {
  children: React.ReactNode;
};

export default function RooTemplate({ children }: Props) {
  return (
    <>
      <Navi />
      {children}
      <Animate />
    </>
  );
}
