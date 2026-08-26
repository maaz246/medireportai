export interface TeamMember {
  id: string;
  name: string;
  role: {
    en: string;
    ur: string;
  };
  bio: {
    en: string;
    ur: string;
  };
  image: string;
  socials: {
    linkedin?: string;
    instagram?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Syeda Ayesha Naz",
    role: {
      en: "Founder & Visionary",
      ur: "بانی اور ویژنری"
    },
    bio: {
      en: "5th year PharmD student at Karachi University.",
      ur: "کراچی یونیورسٹی میں 5 ویں سال کی ڈی فارمیسی کی طالبہ۔"
    },
    image: "/team/syeda-ayesha-naz.jpg",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    id: "2",
    name: "Sarah Al-Mansoor",
    role: {
      en: "Lead Machine Learning Architect",
      ur: "لیڈ مشین لرننگ آرکیٹیکٹ"
    },
    bio: {
      en: "Expert in OCR document intelligence and health NLP models.",
      ur: "او سی آر ڈاکیومنٹ اور صحت کے نیورل ایل پی ماڈلز کی ماہر۔"
    },
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    id: "3",
    name: "David K. Miller",
    role: {
      en: "Principal Healthcare Engineer",
      ur: "پرنسپل ہیلتھ کیئر انجینئر"
    },
    bio: {
      en: "Focuses on HIPAA-compliant infrastructure and clinical data pipelines.",
      ur: "محفوظ طبی ڈیٹا اور سیکیورٹی انفراسٹرکچر کے ماہر۔"
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    id: "4",
    name: "Elena Rostova",
    role: {
      en: "Senior UX & Health Tech Lead",
      ur: "سینئر UX اور ہیلتھ ٹیک لیڈ"
    },
    bio: {
      en: "Crafting intuitive diagnostic visualizers for accessible patient care.",
      ur: "مریضوں کے لیے آسان اور فہم ڈیزائن کی تخلیق کار۔"
    },
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    socials: { linkedin: "#", instagram: "#" }
  }
];
