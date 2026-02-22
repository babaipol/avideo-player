import { HeroSection } from "@/components/sections/HeroSection";
import { CampaignCarousel } from "@/components/sections/CampaignCarousel";
import { IndiaMap } from "@/components/sections/IndiaMap";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { DataVizSection } from "@/components/sections/DataVizSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { PoliticalQuiz } from "@/components/gamification/PoliticalQuiz";
import { AchievementsPanel } from "@/components/gamification/AchievementsPanel";
import { MediaSection } from "@/components/sections/MediaSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CampaignCarousel />
      <IndiaMap />
      <ImpactStats />
      <DataVizSection />
      <AboutSection />
      <TeamSection />
      <PoliticalQuiz />
      <AchievementsPanel />
      <MediaSection />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
