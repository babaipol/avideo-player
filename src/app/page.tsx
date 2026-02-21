import { HeroSection } from "@/components/sections/HeroSection";
import { CampaignCarousel } from "@/components/sections/CampaignCarousel";
import { IndiaMap } from "@/components/sections/IndiaMap";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { AboutSection } from "@/components/sections/AboutSection";
import { TeamSection } from "@/components/sections/TeamSection";
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
      <AboutSection />
      <TeamSection />
      <MediaSection />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
