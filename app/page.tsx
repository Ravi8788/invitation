import dynamic from "next/dynamic";
import { InvitationExperience } from "@/components/InvitationExperience";
import { Countdown } from "@/components/sections/Countdown";
import { Footer } from "@/components/sections/Footer";
import { BlessingsSkeleton } from "@/components/sections/BlessingsSkeleton";
import { SectionSkeleton } from "@/components/sections/SectionSkeleton";

const WeddingDate = dynamic(
  () =>
    import("@/components/sections/WeddingDate").then((m) => ({
      default: m.WeddingDate,
    })),
  { loading: () => <SectionSkeleton label="save the date" compact /> }
);

const OurStory = dynamic(
  () => import("@/components/sections/OurStory").then((m) => ({ default: m.OurStory })),
  { loading: () => <SectionSkeleton label="our story" /> }
);

const EngagementCeremony = dynamic(
  () =>
    import("@/components/sections/EngagementCeremony").then((m) => ({
      default: m.EngagementCeremony,
    })),
  { loading: () => <SectionSkeleton label="ceremony" theme="cinematic" /> }
);

const Venue = dynamic(
  () => import("@/components/sections/Venue").then((m) => ({ default: m.Venue })),
  { loading: () => <SectionSkeleton label="venue" /> }
);

const ThePromise = dynamic(
  () => import("@/components/sections/ThePromise").then((m) => ({ default: m.ThePromise })),
  { loading: () => <SectionSkeleton label="the promise" /> }
);

const Quote = dynamic(
  () => import("@/components/sections/Quote").then((m) => ({ default: m.Quote })),
  { loading: () => <SectionSkeleton label="quote" /> }
);

const Blessings = dynamic(
  () => import("@/components/sections/Blessings").then((m) => ({ default: m.Blessings })),
  { loading: () => <BlessingsSkeleton /> }
);

const Family = dynamic(
  () => import("@/components/sections/Family").then((m) => ({ default: m.Family })),
  { loading: () => <SectionSkeleton label="family" theme="cinematic" /> }
);

const GuestAssistance = dynamic(
  () =>
    import("@/components/sections/GuestAssistance").then((m) => ({
      default: m.GuestAssistance,
    })),
  { loading: () => <SectionSkeleton label="guest assistance" /> }
);

export default function Home() {
  return (
    <InvitationExperience>
      <WeddingDate />
      <OurStory />
      <Countdown />
      <EngagementCeremony />
      <Venue />
      <ThePromise />
      <Quote />
      <Blessings />
      <Family />
      <GuestAssistance />
      <Footer />
    </InvitationExperience>
  );
}
