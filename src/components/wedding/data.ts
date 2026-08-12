export const COUPLE = { bride: "Aanya", groom: "Rohan" };
export const WEDDING_DATE = "2026-12-06T19:00:00+05:30";
export const WEDDING_DATE_LABEL = "6th December 2026";

export const EVENTS = [
  { name: "Haldi", date: "3rd Dec 2026", time: "10:00 AM", venue: "Family Residence, Jaipur", note: "Wear yellow & bring your smile." },
  { name: "Mehendi", date: "4th Dec 2026", time: "4:00 PM", venue: "The Courtyard Lawns", note: "Henna, chai and music all evening." },
  { name: "Sangeet", date: "5th Dec 2026", time: "7:30 PM", venue: "Rajmahal Ballroom", note: "Dancing shoes strongly advised." },
  { name: "Wedding", date: "6th Dec 2026", time: "7:00 PM", venue: "Amrit Bagh Palace", note: "Phere at midnight, dinner follows." },
];

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  honorific: string;
  initials: string;
  gradient: string;
  thought: string;
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
    },
    {
      id: "b-mother",
      name: "Mrs. Meera Sharma",
      relation: "Mother of Bride",
      honorific: "Heart of Warmth & Grace",
      initials: "MS",
      gradient: "from-rose-500 to-amber-700",
      thought: "May your home always echo with laughter, harmony, and a warm morning cup of chai together.",
    },
    {
      id: "b-gfather",
      name: "Mr. Om Prakash",
      relation: "Grandfather",
      honorific: "Elder of Wisdom & Blessings",
      initials: "OS",
      gradient: "from-yellow-600 to-amber-900",
      thought: "A grandfather's blessing is forever. Stay happy, blessed, and always united in every step.",
    },
    {
      id: "b-gmother",
      name: "Mrs. Kamla Sharma",
      relation: "Grandmother",
      honorific: "Keeper of Traditions & Prayers",
      initials: "KS",
      gradient: "from-emerald-600 to-teal-800",
      thought: "May Lord Ganesha shower eternal happiness, health, and peace upon both of you.",
    },
    {
      id: "b-brother",
      name: "Aarav Sharma",
      relation: "Brother",
      honorific: "Protector & Chief Joymaker",
      initials: "AS",
      gradient: "from-cyan-600 to-blue-800",
      thought: "Protecting my sister was my job—now Rohan takes the torch! So thrilled for you two!",
    },
    {
      id: "b-sister",
      name: "Ishita Sharma",
      relation: "Sister",
      honorific: "Best Friend & Soul Sister",
      initials: "IS",
      gradient: "from-pink-500 to-rose-700",
      thought: "Best sister and brother-in-law ever! Welcome to our crazy, joyful family, Rohan!",
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
    },
    {
      id: "g-mother",
      name: "Mrs. Anita Mehra",
      relation: "Mother of Groom",
      honorific: "Grace & Endless Affection",
      initials: "AM",
      gradient: "from-amber-500 to-rose-700",
      thought: "Seeing Rohan so happy with Aanya is our greatest blessing. God bless your sacred journey.",
    },
    {
      id: "g-gfather",
      name: "Mr. Suresh Mehra",
      relation: "Grandfather",
      honorific: "Guardian of Legacy & Joy",
      initials: "SM",
      gradient: "from-amber-700 to-stone-800",
      thought: "Rooted in tradition and growing in love—wishing you a lifetime of joy and togetherness.",
    },
    {
      id: "g-gmother",
      name: "Mrs. Leela Mehra",
      relation: "Grandmother",
      honorific: "Source of Sacred Blessings",
      initials: "LM",
      gradient: "from-orange-500 to-amber-700",
      thought: "May your bond be as everlasting as gold and as sweet as wedding mithai.",
    },
    {
      id: "g-sister",
      name: "Nisha Mehra",
      relation: "Sister",
      honorific: "Joyful Companion & Sister",
      initials: "NM",
      gradient: "from-purple-500 to-indigo-700",
      thought: "Finally got a sister! Can't wait for all the shopping trips and late-night chats, Aanya!",
    },
    {
      id: "g-cousin",
      name: "Kabir Mehra",
      relation: "Cousin / Brother",
      honorific: "Sangeet Champion & Buddy",
      initials: "KM",
      gradient: "from-amber-600 to-orange-800",
      thought: "Cheers to the ultimate power couple! Time to turn up the music and dance at the Sangeet!",
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