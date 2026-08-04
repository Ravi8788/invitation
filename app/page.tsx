import dynamic from "next/dynamic";
import { InvitationExperience } from "@/components/InvitationExperience";
import { Countdown } from "@/components/sections/Countdown";
import { CoupleNames } from "@/components/sections/CoupleNames";
import { Family } from "@/components/sections/Family";
import { Footer } from "@/components/sections/Footer";
import { SectionSkeleton } from "@/components/sections/SectionSkeleton";

const Venue = dynamic(
  () => import("@/components/sections/Venue").then((m) => ({ default: m.Venue })),
  { loading: () => <SectionSkeleton label="स्थळ" theme="cinematic" /> },
);

export default function Home() {
  return (
    <InvitationExperience>
      <CoupleNames />
      <Family />
      <Countdown />
      <Venue />
      <Footer />
    </InvitationExperience>
  );
}
