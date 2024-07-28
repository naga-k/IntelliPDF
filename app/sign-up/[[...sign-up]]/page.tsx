import { Positioning } from "@/components/layout/positioning";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Positioning bgColor="#ffffff">
      <SignUp />
    </Positioning>
  );
}