import { Positioning } from "@/components/layout/positioning";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Positioning bgColor="#ffffff">
      <SignIn />
    </Positioning>
  );
}