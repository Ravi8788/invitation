import dynamic from "next/dynamic";
import { InvitationExperience } from "@/components/InvitationExperience";
import { WeddingDate } from "@/components/sections/WeddingDate";
import { Countdown } from "@/components/sections/Countdown";
import { Footer } from "@/components/sections/Footer";
import { BlessingsSkeleton } from "@/components/sections/BlessingsSkeleton";
import { SectionSkeleton } from "@/components/sections/SectionSkeleton";

const OurStory = dynamic(
  () => import("@/components/sections/OurStory").then((m) => ({ default: m.OurStory })),
  { loading: () => <SectionSkeleton label="our story" /> }
);

const CoupleIllustration = dynamic(
  () =>
    import("@/components/sections/CoupleIllustration").then((m) => ({
      default: m.CoupleIllustration,
    })),
  { loading: () => <SectionSkeleton label="couple" /> }
);

const EngagementCeremony = dynamic(
  () =>
    import("@/components/sections/EngagementCeremony").then((m) => ({
      default: m.EngagementCeremony,
    })),
  { loading: () => <SectionSkeleton label="ceremony" theme="maroon" /> }
);

const Venue = dynamic(
  () => import("@/components/sections/Venue").then((m) => ({ default: m.Venue })),
  { loading: () => <SectionSkeleton label="venue" /> }
);

const ThePromise = dynamic(
  () => import("@/components/sections/ThePromise").then((m) => ({ default: m.ThePromise })),
  { loading: () => <SectionSkeleton label="the promise" /> }
);

const DressCode = dynamic(
  () => import("@/components/sections/DressCode").then((m) => ({ default: m.DressCode })),
  { loading: () => <SectionSkeleton label="attire" theme="maroon" /> }
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
  { loading: () => <SectionSkeleton label="family" theme="maroon" /> }
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
      <CoupleIllustration />
      <EngagementCeremony />
      <Venue />
      <ThePromise />
      <DressCode />
      <Quote />
      <Blessings />
      <Family />
      <GuestAssistance />
      <Footer />
    </InvitationExperience>
  );
}
