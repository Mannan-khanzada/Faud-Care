/**
 * Editable homepage copy. Sections are intentionally modular so they can be
 * reordered, shown, or hidden from the CMS in a later step.
 */
export const homepage = {
  hero: {
    heading: 'A safe space to understand yourself, heal, and grow.',
    description:
      "You don't have to figure everything out alone. FUAD offers thoughtful counselling support in a space where you can pause, reflect, and be heard without judgment.",
    primaryCta: 'Book a Session',
    secondaryCta: 'Explore Counselling',
  },
  intro: {
    eyebrow: 'Welcome',
    heading: 'You are welcome here. Take your time.',
    body: "Sometimes life becomes difficult to navigate alone. Counselling can offer a space to slow down, make sense of what you're experiencing, and explore what comes next.",
    pillars: ['Being heard', 'Reflection', 'Understanding', 'Growth', 'Support'],
  },
  process: [
    {
      step: '01',
      title: 'Reach Out',
      body: 'Start a conversation with FUAD, whenever you feel ready.',
    },
    {
      step: '02',
      title: 'Find the Right Support',
      body: 'Explore our services and counsellors to find what suits you.',
    },
    {
      step: '03',
      title: 'Book Your Session',
      body: 'Choose an available time through Google Calendar.',
    },
    {
      step: '04',
      title: 'Take the Next Step',
      body: 'Begin your journey at your own pace, with support alongside you.',
    },
  ],
  approach: {
    eyebrow: 'The FUAD Approach',
    heading: 'Counselling is not about someone handing you all the answers.',
    body: 'It can provide space to pause and reflect, understand your emotions, and take an active role in your own growth.',
    points: [
      'Pause and reflect',
      'Understand your emotions',
      'Explore patterns',
      'Navigate relationships',
      'Work through challenges',
      'Develop healthier responses',
      'Understand yourself better',
      'Take an active role in growth',
    ],
  },
  why: {
    eyebrow: 'Why FUAD',
    heading: 'Support that is thoughtful, private, and genuinely human.',
    pillars: [
      {
        title: 'Confidential',
        body: 'A space designed for thoughtful and private conversations.',
      },
      {
        title: 'Person-Centred',
        body: 'Your experiences and perspective matter here.',
      },
      {
        title: 'Professional',
        body: 'Support that is thoughtful, responsible, and grounded in professional practice.',
      },
      {
        title: 'Culturally Aware',
        body: 'Experiences can be shaped by family, culture, relationships, responsibilities, values, and environment.',
      },
      {
        title: 'Human',
        body: "You don't need to have everything figured out before reaching out.",
      },
    ],
  },
} as const
