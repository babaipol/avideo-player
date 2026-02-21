import type { Campaign } from "@/types";

export const campaigns: Campaign[] = [
  {
    id: "delhi-2025",
    title: "Delhi Assembly Elections 2025",
    state: "Delhi",
    year: 2025,
    description:
      "A comprehensive data-driven campaign strategy for the Delhi Assembly Elections, focusing on urban voter outreach and grassroots mobilization across all 70 constituencies.",
    imageUrl:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    stats: [
      { label: "Constituencies", value: "70" },
      { label: "Volunteers", value: "50,000+" },
      { label: "Voter Contacts", value: "5M+" },
    ],
    outcome: "Comprehensive grassroots mobilization campaign",
    tags: ["Urban", "Assembly", "Data-Driven"],
  },
  {
    id: "bengal-2024",
    title: "West Bengal State Campaign 2024",
    state: "West Bengal",
    year: 2024,
    description:
      "A massive state-wide campaign encompassing all 294 assembly seats with a focus on youth outreach, digital engagement, and booth-level management.",
    imageUrl:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    stats: [
      { label: "Assembly Seats", value: "294" },
      { label: "Youth Engaged", value: "82,000+" },
      { label: "Districts", value: "23" },
    ],
    outcome: "Historic electoral mandate for progressive governance",
    tags: ["State-Wide", "Youth", "Digital"],
  },
  {
    id: "andhra-pradesh-2024",
    title: "Andhra Pradesh Elections 2024",
    state: "Andhra Pradesh",
    year: 2024,
    description:
      "Strategic campaign management for Andhra Pradesh focusing on rural voter engagement, welfare scheme communication, and candidate positioning.",
    imageUrl:
      "https://images.unsplash.com/photo-1529928230853-e73ef7e7b3fc?w=800&q=80",
    stats: [
      { label: "Total Seats", value: "175" },
      { label: "Rural Reach", value: "12M+" },
      { label: "Districts", value: "26" },
    ],
    outcome: "Successful rural voter engagement program",
    tags: ["Rural", "Welfare", "Strategy"],
  },
  {
    id: "telangana-2023",
    title: "Telangana Assembly Elections 2023",
    state: "Telangana",
    year: 2023,
    description:
      "End-to-end campaign management for Telangana Assembly Elections with focus on urban-rural integration, issue-based messaging, and real-time data analytics.",
    imageUrl:
      "https://images.unsplash.com/photo-1573607217032-18299406d100?w=800&q=80",
    stats: [
      { label: "Constituencies", value: "119" },
      { label: "Campaign Events", value: "5,000+" },
      { label: "Media Mentions", value: "10,000+" },
    ],
    outcome: "Transformative change in state governance",
    tags: ["Analytics", "Media", "Urban-Rural"],
  },
  {
    id: "karnataka-2023",
    title: "Karnataka Assembly Elections 2023",
    state: "Karnataka",
    year: 2023,
    description:
      "A multi-lingual, multi-region campaign strategy for Karnataka spanning urban tech hubs, coastal regions, and rural agricultural belts.",
    imageUrl:
      "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=800&q=80",
    stats: [
      { label: "Total Seats", value: "224" },
      { label: "Languages", value: "5" },
      { label: "Campaign Teams", value: "500+" },
    ],
    outcome: "Largest electoral victory in two decades",
    tags: ["Multi-lingual", "Regional", "Coalition"],
  },
  {
    id: "gujarat-2022",
    title: "Gujarat Assembly Elections 2022",
    state: "Gujarat",
    year: 2022,
    description:
      "Innovative campaign strategy for Gujarat featuring ground-level booth management, digital outreach, and issue-based voter communication.",
    imageUrl:
      "https://images.unsplash.com/photo-1566802451073-467c61d47e5a?w=800&q=80",
    stats: [
      { label: "Assembly Seats", value: "182" },
      { label: "Booth Committees", value: "50,000+" },
      { label: "Digital Reach", value: "8M+" },
    ],
    outcome: "Strong performance in competitive political landscape",
    tags: ["Booth Management", "Digital", "Grassroots"],
  },
];
