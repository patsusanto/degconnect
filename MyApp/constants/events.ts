export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  cta: string;
  isLive?: boolean;
  trending?: boolean;
  attendeeCount: number;
  maxAttendees?: number;
  avatars: string[];
  isJoin: boolean;
  description: string;
  host?: { name: string; avatar: string; rating: string; games: string };
  requirements?: string[];
}

const AV = {
  a: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUT-Akyo4eNiqYiNuxyEGIuqFiuwQfsOETVyFHGmv0pf5SKuLZSm5vNX1S21M06jJ-S2W0WDx0rNtE04UEo7m4Ujrfb9mFYVhitkWkRPcOHkRxVc2BiTXUNx5UsHaQCDTDUBeGPM8VHI-rVyJufBvy0pU_hCQu2GNAyMJOxEs8tiBr_3aWqlGIZ2PjM-9PVa7ikOyQH9pzzWY0B3q41IDd9Vfi7Ue7dVhQfq8ZjcG-L5W-7I4o94-ndZj_gBnssCG-N-IvNJ-FYh8',
  b: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ57GBE-4OnB3WrWZqvHqyaRhf2ezUf8K14IYw0HfUSW-gdhruFeZMCdr13fkiIOr_uYVyN_D-hAZPOUsQN5RYD63fDZaLJMN2kbMBvsD6uDXAQKrteXVVnvNXBVyvb-sZKFPV2O-D-fZlT4hmF9BLQM34hRpOE_6Mi4Nd7bINTsC4WPuczI7ziXqKcTy9HkeBrEeZ3MkJNG6KqqlEKhFUG7lIDi87eFpZS36DY-ycLXXuSbdMHH9M8yJK-isXkMci3FSTu4zJrZw',
  c: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwE_OKcppWBshv02lW7v-NXT6dzcjCWNuw5udYlDUDbLrf9JdXWRrRL36IWqbsvwFAgTxcIhZRob1jvGOPGZ4jvj__q6d6RrU1lMFhcbmL12IywGPbubMObyoHLR9JJ5HDBZHeAQEBOF5ZaZj8_8NvSRlpcI2DW3GMfirvET5hmw1X5sNJ9QVg8uqd6J5T90ojJT7RuEKKeN8mFygLp9XVWMROZliur1EkLxAOy6ZfngOZSvutIPVcM_nSfe6G3MVh3g_6ueWWbIs',
  d: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgvh04A3MYbr5JWEh3AmqbOBzo5XwanDqvL9kvkCoDYAr2DyX5xhJWtkWzWqcrHegS271RUkqJo9QZp-EhVwyaYOuwPjvylDji1bJc0pqGexwdVjeg_9PiQ9YiaT5E4tBP1rw6QPXd0OQWoolEd4Jd3JrzmIV0KfGS-aJWZDR2V93J4ob82h0X4lVLf9e8hY_h3q74hkiNCa08s89G283Pw53GL4xE14F1F1TLPf5diY4pupfmiYgFJqUOBmkxalSwLx9AsCiFxSo',
};

export const ALL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Spontan Cocktail Night',
    category: 'Nightlife',
    date: 'Today • 9:00 PM',
    location: 'Deggendorf Altstadt',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-5t3Dwhmo6oFoWilN2lzFjLJdVOMUzamolLoASm-EZziUIrGkqOSSOXL_NmZgHDzX0Mxpko90oAx8_VliE-tKPqcPyavHumT28u5LOy962an-rTFy_y6zn3ypKfQXHgi9P6dJV3M6z5JakkOpPTzMgtMrJX-geM-jaivEnYRIF8eiJB4ITw49N9Ql71NQMITrwNLb2l09VaMQyu-1hDulQy8Blt7uwfYQKULXzRSeHOlulPlwzhHkA6R_JpWxaZGBq5srdDSskGY',
    cta: 'Join Vibe',
    isLive: true,
    trending: true,
    attendeeCount: 18,
    avatars: [AV.a, AV.b, AV.d],
    isJoin: true,
    description: 'An impromptu gathering in the heart of Deggendorf\'s Altstadt. Local bartenders are showcasing experimental craft cocktails tonight only — neon-lit, neon-priced. First come, first vibed. No reservations, no dress code, just good energy and better drinks.',
    requirements: ['18+ with Valid ID', 'Casual dress welcome'],
  },
  {
    id: '2',
    title: 'Full Court Pick-up @ Eisstadion',
    category: 'Sports',
    date: 'Started 15m ago',
    location: 'Eisstadion Basketball Courts, Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXkebfWZzHI0lkhVzhgzpDoLRHwB7F73jauvbzi0DTuCiCR2o2slyCydEfOJki2ELYfUQ8TJZ3u51ke0jWEFBUwoLYhqvGWg0Xld16bIHhmVZ85ws8I4p9uzbD4wEhGZYaPegopB5xTl_wrG_NOhTaGzxl3HSuRSMv05EEwg5izofhE9rClP9dXuQsrgm35d_LQJKCshLgiuV3x12YakCAzbWSWs1RPpqoStEIgfseITQpwsDejbFOICFpW-HmVWnpWvzlilb-aoo',
    cta: 'Check In',
    isLive: true,
    trending: true,
    attendeeCount: 10,
    maxAttendees: 12,
    avatars: [AV.b, AV.c, AV.a],
    isJoin: true,
    description: 'The outdoor courts next to the Eisstadion are alive. Full 5-on-5 running right now — need one more to balance teams. All levels welcome, just bring your A-game and some water. Games rotate every 20 minutes.',
    requirements: ['Bring your own ball optional', 'Sports shoes required'],
  },
  {
    id: '3',
    title: 'Padel Partners: Deggendorf Open',
    category: 'Matchmaking',
    date: 'Tomorrow • 10:00 AM',
    location: 'Sports Arena Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRY-hQSJnAUNuMssxkgAWNqvH9b7gjq5M9HcVUZ9JUcumbnw2RtL_9fnRiuL80D6xhXgXhnsSyz8b9sM4cHhdU3jo_F3YS3CZyqvmwLjeeMpzOzJj2zJxn5rj0n_WYxqZcBnHGI1W0Sa50IIkmr2aA37yy7PDFrL7ReK9P8UcgjV23x_cd5XNR2nyzyV-LArVYYZNlc9Qm7QGoKmxtP0BwUYWJCslPZAbVxah17A9qyaCeIR8e4iu4eLSv5qWxiA3oLO1qvJe4tLo',
    cta: 'Apply to Play',
    trending: true,
    attendeeCount: 4,
    avatars: [AV.a, AV.c],
    isJoin: false,
    description: 'Looking for two intermediate players to complete a doubles session at the Sports Arena. High energy only! Hosted by Marco, rated 4.8 with 12 games under his belt. Court is booked, rackets provided on request.',
    host: {
      name: 'Marco',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqrOlHhdzW9d1KzTlFYmJ8Npr-LTHwd4XxWAKsGfJqRRcZQOZfnAfsvRF4I0wX5zjfMLXfLfT4GYwuxQXhQCbW45BDJtOVPsBwgXbd6px0Lpcr-KiTbolU2wzAxmF3GYCCW28JMIhRGr2bRZrwI1bAPH9Zr6fJWOo7GCDfo8bA9rOcaD5l_kDEqqAzxnOzBVIzct1tVWJrFzHZw-gIBvik6fNNZXOO3ZpPPDweQO1WwWKxE4RjWLvUXmdD059AR8_vkNH8ngZIqK0',
      rating: '4.8',
      games: '12',
    },
    requirements: ['Intermediate level', 'Sports shoes required'],
  },
  {
    id: '4',
    title: 'Donau Cycling Tour',
    category: 'Outdoors',
    date: 'Sat • 9:00 AM',
    location: 'Donauradweg, Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzkQpz0VbP81h5q1kDQwsU6TVSgf6KXUgOMn5-acESNS18Qqku47fs5TfXjzQ-ZdJ4q2zh1vmDqIBABU4dM6ZWD1bG7_NusISfF_G3BAcYQ5eBCeVC7H7u9RvCur5VeYhDEEcvi8okj78bdkUrHBV6-va2yvrChetFCJfQhauaxvaVNadS0rAt-u4rTKEZYYF20mjv35yI2Z-tjpw_BIvKRFKMetLSqes9NHyGOC3KuGws1XC1Pm0j59uYmsK4NU9TYI8oaRQ6pIA',
    cta: 'Join Ride',
    attendeeCount: 22,
    avatars: [AV.a, AV.b, AV.d],
    isJoin: false,
    description: 'A relaxed 35km group ride along the iconic Danube cycle path heading east towards Osterhofen and back. Flat terrain, scenic river views, and a pitstop at a riverside café. All bikes welcome — no racing, just vibes.',
    requirements: ['Helmet required', 'Bring water & snacks'],
  },
  {
    id: '5',
    title: 'Bayerischer Wald Group Hike',
    category: 'Outdoors',
    date: 'Sun • 8:00 AM',
    location: 'Trailhead Grafling, near Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx1g0XSlsS4n4pPZ09i6qN_zVYMpso7n6HLMI_4LG5CX8hZ5QPtqZVZ0EwR3o5e3sYSv2Ur7A1sZe5nJ41z9DgCaqG4O61Ek7sAWoU75AIgh7nimrK6bOs2bRUQ7WhnmuERNv7OWLl5f7UrvLXME2ItiJt9dT7_h7Abh2aQmMMgNi_RxyLP7bPm8aHKOZPK1sHWp5L_4sJGY8AAopOdquHGXUuCof0aMFWuzPCVofBLCZe3Hj_kikFG1r1tIMZq9_yRBxROoHNN04',
    cta: 'Join Hike',
    attendeeCount: 14,
    avatars: [AV.b, AV.c],
    isJoin: false,
    description: 'Escape into the Bayerischer Wald for a Sunday morning group hike. 12km circular trail through dense forest, open ridges, and a panoramic viewpoint over Lower Bavaria. Moderate difficulty — poles recommended but not required.',
    requirements: ['Sturdy hiking shoes', 'Bring 2L of water'],
  },
  {
    id: '6',
    title: 'Stadtpark Biergarten Evening',
    category: 'Social',
    date: 'Today • 6:00 PM',
    location: 'Stadtpark, Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuNLk_nKR7WzDe9ldU_g0Yg7-2SmYu981OG9eSnguNVoUi6xpR7LaA0cqC-ZnhPD5QaE8KaRBCyX7_3EriWcMBSLlVnraa_LqlqN9Rdyeqdkbk4Bb8xh8EWrK9XAALFzPbTSiUzf4eO1qcNkPclYCU1llZq_v5CYxKHL_iCJykpm2_FPzqb7b54Ov3Mg0U5wHyNrtxW2JP-BRPxr0ArGO5GmryCFl_XKEh4hUCYVCTb-8WUZ7aJdNt1cDEWZJj2q7MRD42C054nOE',
    cta: 'I\'m Coming',
    attendeeCount: 31,
    avatars: [AV.a, AV.b, AV.d],
    isJoin: true,
    description: 'The classic Lower Bavarian biergarten experience in Deggendorf\'s Stadtpark. Cold Maßkrüge, pretzels, live accordion, and the best people watching in the city. Show up, grab a bench, and let the evening happen.',
  },
  {
    id: '7',
    title: 'Open Swim @ Freibad Deggendorf',
    category: 'Sports',
    date: 'Today • 2:00 PM',
    location: 'Freibad Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClOa0-DptQotuiqe7CoAop-xcL87jWLgepsUpZEVJ5CGrWUHrDoHrb94YAbZvKbFsZTax8C9bxVeBtvzDYyyiH6qpemVgHdniqWCHKHZPUtg8L8OMAIpKttiGYOwpd9f-74VlC-o5OecaSu8c9KNyoFuUAxJ0KKwzq0FX0mF7otRn9aHNJxt8xkvxw0STUEZFan32LQsbaXvJBk44AIEwjacjQKQ_ui2HPwQrSuIiVAF0V5pIhx1ctj9QHIZQBKW9oFcfLNQfi85E',
    cta: 'Join Swim',
    attendeeCount: 27,
    avatars: [AV.c, AV.a],
    isJoin: false,
    description: 'Group meeting at the Freibad for a casual afternoon swim. Lap lanes and the open area both available. Great way to cool off and meet fellow Deggendorf locals. Afterwards heading to the park for snacks.',
    requirements: ['Swim cap required in lanes', 'Entry fee: €4'],
  },
  {
    id: '8',
    title: 'Luitpoldplatz Farmers Market',
    category: 'Community',
    date: 'Sat • 8:00 AM',
    location: 'Luitpoldplatz, Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB32GrKhO_J-3gnNHe8LG1-ZutGwZJ3xiP0waXZ5pQGoSzMG0iY0Hxiu_s1HjVOfGldvUe7eveto_NAR1L2RjhWezSCSm8ebGNvQAJ19gWZtLRb0Dpu2jgDudT0deUeQfmPArZYZLsKmjwVO6LfsxgpSNMlMuO6mShrSap6aOFDsP7odjeDw_jKQ5EEz2PwENXN24BD5Y7M7oDg5jsouE1ZKftL6efx4XtKIUD-IMHhb_Cgy5IMShW16R33NT5tOAxQHcX9aG6EFVc',
    cta: 'I\'ll Be There',
    attendeeCount: 55,
    avatars: [AV.a, AV.b, AV.c],
    isJoin: false,
    description: 'The weekly Saturday market on Luitpoldplatz. Fresh vegetables, local honey, artisan bread, and cheese from farms across Lower Bavaria. Come early for the best picks. Bring your own bag and some Bargeld.',
  },
  {
    id: '9',
    title: 'Comedy Night @ Stadttheater',
    category: 'Culture',
    date: 'Fri • 8:00 PM',
    location: 'Stadttheater Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkuxfGG_eQ0DkQKXHsAKghWJhU4dctemi1DtZ5Onm2isTqBuxZhdWuFxzByZ9lw3jRof-7_Zl32IEBSerEeKXd9nPl1AHPvmPNYKBxB40vYH03KxPC6BbiUPDxNTB_NX1TK2hYMwgAU1PHXZSoUYH8y2RYVtg6lqZNnOTdg3-O_CQuIJ6thmRSqBmB6mzjXPg8Tf5ZRjS2KR3RqB3b8u6_8fx0XLWfNleRglkSxczO5dSH2yibHtEni9SS8GGLIONE27CqxhjTlKQ',
    cta: 'Get Tickets',
    attendeeCount: 42,
    avatars: [AV.b, AV.c, AV.d],
    isJoin: false,
    description: 'Stand-up comedy night at the historic Stadttheater Deggendorf. Three local and regional comedians taking the stage for 90 minutes of Bavarian-flavored humour. Bar open from 7PM. Limited seats — don\'t sleep on it.',
    requirements: ['Tickets: €12 at the door', '18+ recommended'],
  },
  {
    id: '10',
    title: 'Kayaking on the Danube',
    category: 'Outdoors',
    date: 'Sun • 10:00 AM',
    location: 'Donauhafen, Deggendorf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhmaEic-AHWob8M9kVz0F_a8z9E-xjVdtUz1X3pGLEoPwaXjeOEI9S0DOh8jeDOtaHdS-yMYG-PYq8J5c9zGPuIc7F4FesxusEqzqy0kXxc1spVMiwHXtCbZPOTb4stPFOFYiDyVK8Jf344B0sTSH0fYh_daZg9oLz4USMHdALtCx2_wQsf9Ej3pwWVfSHotT0KK5jYNQQ92pgDVSN1SuADTBZiClHXQo6oznurQRBX8qq-0XiQ3Z8-N-EHyYjOw_GpmNr7MSduS8',
    cta: 'Reserve Spot',
    attendeeCount: 9,
    avatars: [AV.a, AV.d],
    isJoin: false,
    description: 'Paddle 10km downstream from the Donauhafen and back at your own pace. Kayaks available for rent at the harbour (€15 for 2hrs). Group sets off together but no pressure to keep up. The Danube is calm and perfect this time of year.',
    requirements: ['Life vest provided', 'Basic swimming ability'],
  },
];

export const FEED_EVENT_IDS = ['1', '2', '3'];

export function getEventById(id: string): Event | undefined {
  return ALL_EVENTS.find(e => e.id === id);
}
