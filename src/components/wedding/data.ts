import { Heart, Sparkles, Camera, Users, Gem } from "lucide-react";

export const COUPLE = { bride: "Aanya", groom: "Rohan" };
export const WEDDING_DATE = "2026-12-06T19:00:00+05:30";
export const WEDDING_DATE_LABEL = "6th December 2026";

export const EVENTS = [
  { name: "Haldi", date: "3rd Dec 2026", time: "10:00 AM", venue: "Family Residence, Jaipur", dressCode: "Yellow Traditional", note: "Wear yellow & bring your smile." },
  { name: "Mehendi", date: "4th Dec 2026", time: "4:00 PM", venue: "The Courtyard Lawns", dressCode: "Green & Floral Attire", note: "Henna, chai and music all evening." },
  { name: "Sangeet", date: "5th Dec 2026", time: "7:30 PM", venue: "Rajmahal Ballroom", dressCode: "Glamorous Indo-Western", note: "Dancing shoes strongly advised." },
  { name: "Wedding", date: "6th Dec 2026", time: "7:00 PM", venue: "Amrit Bagh Palace", dressCode: "Royal Ethnic & Traditional", note: "Phere at midnight, dinner follows." },
  { name: "Universal Card", date: "7th Dec 2026", time: "8:00 PM", venue: "Grand Ballroom, Jaipur", dressCode: "Royal Formal Attire", note: "Celebration continues with love & joy." },
];

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  honorific: string;
  initials: string;
  gradient: string;
  thought: string;
  image?: string;
}

export const FAMILY: Record<"bride" | "groom", FamilyMember[]> = {
  bride: [
    {
      id: "b-father",
      name: "Mr. Vikram Sharma",
      relation: "Father of Bride",
      honorific: "Pillar of Strength & Guidance",
      initials: "VS",
      gradient: "from-amber-600 to-amber-800",
      thought: "Watching our daughter step into this beautiful new chapter fills our hearts with endless love and pride.",
      image: "/assets/family/father_bride.webp",
    },
    {
      id: "b-mother",
      name: "Mrs. Meera Sharma",
      relation: "Mother of Bride",
      honorific: "Heart of Warmth & Grace",
      initials: "MS",
      gradient: "from-rose-500 to-amber-700",
      thought: "May your home always echo with laughter, harmony, and a warm morning cup of chai together.",
      image: "/assets/family/mother_bride.webp",
    },
    {
      id: "b-gfather",
      name: "Mr. Om Prakash",
      relation: "Grandfather",
      honorific: "Elder of Wisdom & Blessings",
      initials: "OS",
      gradient: "from-yellow-600 to-amber-900",
      thought: "A grandfather's blessing is forever. Stay happy, blessed, and always united in every step.",
      image: "/assets/family/gfather.webp",
    },
    {
      id: "b-gmother",
      name: "Mrs. Kamla Sharma",
      relation: "Grandmother",
      honorific: "Keeper of Traditions & Prayers",
      initials: "KS",
      gradient: "from-emerald-600 to-teal-800",
      thought: "May Lord Ganesha shower eternal happiness, health, and peace upon both of you.",
      image: "/assets/family/gmother.webp",
    },
    {
      id: "b-brother",
      name: "Aarav Sharma",
      relation: "Brother",
      honorific: "Protector & Chief Joymaker",
      initials: "AS",
      gradient: "from-cyan-600 to-blue-800",
      thought: "Protecting my sister was my job—now Rohan takes the torch! So thrilled for you two!",
      image: "/assets/family/brother.webp",
    },
    {
      id: "b-sister",
      name: "Ishita Sharma",
      relation: "Sister",
      honorific: "Best Friend & Soul Sister",
      initials: "IS",
      gradient: "from-pink-500 to-rose-700",
      thought: "Best sister and brother-in-law ever! Welcome to our crazy, joyful family, Rohan!",
      image: "/assets/family/sister.webp",
    },
  ],
  groom: [
    {
      id: "g-father",
      name: "Mr. Rajesh Mehra",
      relation: "Father of Groom",
      honorific: "Family Anchor & Pride",
      initials: "RM",
      gradient: "from-indigo-600 to-blue-900",
      thought: "A son finds his soulmate, and our family gains a cherished daughter. Welcome home, Aanya!",
      image: "/assets/family/father_bride.webp",
    },
    {
      id: "g-mother",
      name: "Mrs. Anita Mehra",
      relation: "Mother of Groom",
      honorific: "Grace & Endless Affection",
      initials: "AM",
      gradient: "from-amber-500 to-rose-700",
      thought: "Seeing Rohan so happy with Aanya is our greatest blessing. God bless your sacred journey.",
      image: "/assets/family/mother_bride.webp",
    },
    {
      id: "g-gfather",
      name: "Mr. Suresh Mehra",
      relation: "Grandfather",
      honorific: "Guardian of Legacy & Joy",
      initials: "SM",
      gradient: "from-amber-700 to-stone-800",
      thought: "Rooted in tradition and growing in love—wishing you a lifetime of joy and togetherness.",
      image: "/assets/family/gfather.webp",
    },
    {
      id: "g-gmother",
      name: "Mrs. Leela Mehra",
      relation: "Grandmother",
      honorific: "Source of Sacred Blessings",
      initials: "LM",
      gradient: "from-orange-500 to-amber-700",
      thought: "May your bond be as everlasting as gold and as sweet as wedding mithai.",
      image: "/assets/family/gmother.webp",
    },
    {
      id: "g-sister",
      name: "Nisha Mehra",
      relation: "Sister",
      honorific: "Joyful Companion & Sister",
      initials: "NM",
      gradient: "from-purple-500 to-indigo-700",
      thought: "Finally got a sister! Can't wait for all the shopping trips and late-night chats, Aanya!",
      image: "/assets/family/sister.webp",
    },
    {
      id: "g-cousin",
      name: "Kabir Mehra",
      relation: "Cousin / Brother",
      honorific: "Sangeet Champion & Buddy",
      initials: "KM",
      gradient: "from-amber-600 to-orange-800",
      thought: "Cheers to the ultimate power couple! Time to turn up the music and dance at the Sangeet!",
      image: "/assets/family/brother.webp",
    },
  ],
};

export const VENUE = {
  name: "Amrit Bagh Palace",
  address: "Amer Road, Jaipur, Rajasthan 302002",
  mapsQuery: "Amer Road Jaipur Rajasthan",
  contacts: [
    { name: "Aarav (Bride's side)", phone: "+919812345670" },
    { name: "Kabir (Groom's side)", phone: "+919812345671" },
  ],
};

export const INITIAL_BLESSINGS = [
  { name: "Meera Aunty", text: "May your love glow brighter than a thousand diyas." },
  { name: "Kabir", text: "Two beautiful souls, one gorgeous journey. So happy for you!" },
  { name: "Ishita", text: "Best sister-in-law ever. Welcome to the madness, Rohan!" },
  { name: "The Kapoors", text: "Wishing you laughter, patience and endless chai together." },
];

export interface GalleryPhoto {
  id: number | string;
  caption: string;
  subtitle?: string;
  date?: string;
  tint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
}

export const PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    caption: "The First Hello",
    subtitle: "January 2025",
    date: "Jan 2025",
    tint: "from-rose-600/90 via-amber-500/80 to-yellow-600/90",
    icon: Heart,
    image: "/assets/gallery/hello.webp",
  },
  {
    id: 2,
    caption: "Roka Ceremony",
    subtitle: "February 2026",
    date: "Feb 2026",
    tint: "from-amber-600/90 via-rose-500/80 to-purple-700/90",
    icon: Sparkles,
    image: "/assets/gallery/roka.webp",
  },
  {
    id: 3,
    caption: "Jaipur Evenings",
    subtitle: "July 2026",
    date: "Jul 2026",
    tint: "from-teal-600/90 via-emerald-500/80 to-amber-600/90",
    icon: Camera,
    image: "/assets/gallery/jaipur.webp",
  },
  {
    id: 4,
    caption: "Family Togetherness",
    subtitle: "November 2026",
    date: "Nov 2026",
    tint: "from-indigo-600/90 via-purple-500/80 to-rose-600/90",
    icon: Users,
    image: "/assets/gallery/together.webp",
  },
  {
    id: 5,
    caption: "Forever & Always",
    subtitle: "December 2026",
    date: "Dec 2026",
    tint: "from-amber-500/90 via-yellow-400/80 to-rose-700/90",
    icon: Gem,
    image: "/assets/gallery/forever.webp",
  },
];