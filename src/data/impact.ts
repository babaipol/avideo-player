import type { ImpactStat } from "@/types";

export const impactStats: ImpactStat[] = [
  {
    id: "cohort-members",
    label: "Cohort Members",
    value: 1100000,
    suffix: "+",
    description:
      "Trained political workers empowered with data-driven campaign skills",
    icon: "users",
  },
  {
    id: "youth-engaged",
    label: "Youth Engaged",
    value: 82000,
    suffix: "+",
    description:
      "Young professionals and students engaged in democratic participation",
    icon: "graduation",
  },
  {
    id: "team-members",
    label: "Expert Team",
    value: 400,
    suffix: "+",
    description:
      "Dedicated professionals across strategy, data, digital, and operations",
    icon: "briefcase",
  },
  {
    id: "states-covered",
    label: "States Covered",
    value: 20,
    suffix: "+",
    description: "Indian states where I-PAC has run successful campaigns",
    icon: "map",
  },
  {
    id: "elections-won",
    label: "Campaigns Managed",
    value: 50,
    suffix: "+",
    description:
      "State and national elections where I-PAC provided strategic support",
    icon: "trophy",
  },
  {
    id: "voter-contacts",
    label: "Voter Contacts",
    value: 100,
    suffix: "M+",
    description:
      "Individual voter interactions through digital and ground campaigns",
    icon: "phone",
  },
];
