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
      en: "5th year Pharm D student at Karachi University.",
      ur: "کراچی یونیورسٹی میں 5 ویں سال کی ڈی فارمیسی کی طالبہ۔"
    },
    image: "/team/syeda-ayesha-naz.jpg",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    id: "2",
    name: "Manal Adnan",
    role: {
      en: "Ui/Ux Designer",
      ur: "یو آئی / یو ایکس ڈزائنر"
    },
    bio: {
      en: "5th year Pharm D student at Karachi University.",
      ur: "کراچی یونیورسٹی میں 5 ویں سال کی ڈی فارمیسی کی طالبہ۔"
    },
    image: "/team/manal-adnan.jfif",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    id: "3",
    name: "Iqra M.Samad",
    role: {
      en: "Data Collector",
      ur: "ڈیٹا کلکٹر"
    },
    bio: {
      en: "5th year Pharm D student at Karachi University.",
      ur: "کراچی یونیورسٹی میں 5 ویں سال کی ڈی فارمیسی کی طالبہ۔"
    },
    image: "/team/iqra-m-samad.jpg",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    id: "4",
    name: "Sara Habib",
    role: {
      en: "Data Collector",
      ur: "ڈیٹا کلکٹر"
    },
    bio: {
      en: "5th year Pharm D student at Karachi University.",
      ur: "کراچی یونیورسٹی میں 5 ویں سال کی ڈی فارمیسی کی طالبہ۔"
    },
    image: "/team/sara-habib.jpg",
    socials: { linkedin: "#", instagram: "#" }
  }
];
