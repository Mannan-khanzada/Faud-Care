import { cache } from 'react'
import { getSupabasePublicClient } from '@/lib/supabase/server'
import { toList } from '@/lib/to-list'

/**
 * Every editable piece of page copy lives here as a "field" with a default.
 * The admin panel (/admin/content) renders a form from this list, and saved
 * values are stored in the `site_content` table. If a value was never edited
 * (or Supabase is unavailable) the default below is used, so the public site
 * always renders.
 *
 * Field types
 *   text     one line
 *   textarea paragraph(s)
 *   list     one item per line
 *   pairs    one item per line as  "Title | Description"
 *   image    URL / path, or an uploaded file
 */
export type FieldType = 'text' | 'textarea' | 'list' | 'pairs' | 'image'

export type ContentGroup =
  | 'home'
  | 'about'
  | 'support'
  | 'events'
  | 'counsellors'
  | 'general'

export type ContentField = {
  key: string
  group: ContentGroup
  section: string
  label: string
  type: FieldType
  hint?: string
  default: string
}

export const contentGroups: { id: ContentGroup; label: string; description: string }[] = [
  { id: 'home', label: 'Homepage', description: 'Headlines, intro, approach, and the home page sections.' },
  { id: 'about', label: 'About FUAD', description: 'Every section of the About page.' },
  { id: 'support', label: 'Support page', description: 'Heading and wording around the support packages.' },
  { id: 'events', label: 'Events page', description: 'Heading and wording around the events listing.' },
  { id: 'counsellors', label: 'Counsellors page', description: 'Heading text for the counsellors list.' },
  { id: 'general', label: 'Shared call-to-action', description: 'The closing call-to-action shown on most pages.' },
]

const lines = (...items: string[]) => items.join('\n')

function f(
  group: ContentGroup,
  section: string,
  key: string,
  label: string,
  type: FieldType,
  def: string,
  hint?: string,
): ContentField {
  return { key, group, section, label, type, default: def, hint }
}

export const contentFields: ContentField[] = [
  // ---------------- HOME ----------------
  f('home', 'Hero', 'home.hero_eyebrow', 'Small label above the headline', 'text', 'Online counselling · Spiritual foundation'),
  f('home', 'Hero', 'home.hero_heading', 'Main headline (USP)', 'text', 'Online counselling with a spiritual foundation.'),
  f('home', 'Hero', 'home.hero_description', 'Supporting text', 'textarea',
    'FUAD offers accessible, confidential, and compassionate support for your emotional wellbeing, relationships, and personal growth — from wherever you are.'),
  f('home', 'Hero', 'home.hero_secondary_cta', 'Second button label', 'text', 'Explore Support'),
  f('home', 'Hero', 'home.hero_secondary_href', 'Second button link', 'text', '/support', 'A page on this site, e.g. /support, or a full https:// link'),
  f('home', 'Hero', 'home.hero_image', 'Hero image', 'image', '/hero.png'),

  f('home', 'Welcome', 'home.intro_eyebrow', 'Label', 'text', 'Welcome'),
  f('home', 'Welcome', 'home.intro_heading', 'Heading', 'text', 'You are welcome here. Take your time.'),
  f('home', 'Welcome', 'home.intro_body', 'Text', 'textarea',
    "Sometimes life becomes difficult to navigate alone. FUAD offers a space to slow down, make sense of what you're experiencing, and find steadiness — through conversations that respect your emotions, your values, and your spiritual life."),
  f('home', 'Welcome', 'home.intro_pillars', 'Tags', 'list',
    lines('Online & accessible', 'Confidential', 'Compassionate', 'Spiritually grounded', 'Growth'), 'One per line'),

  f('home', 'Services', 'home.services_eyebrow', 'Label', 'text', 'Services'),
  f('home', 'Services', 'home.services_title', 'Heading', 'text', "Support for what you're carrying"),
  f('home', 'Services', 'home.services_description', 'Text', 'textarea',
    'Online counselling across the areas of life where a little support can make a difference — relationships, stress, anxiety, and personal growth.'),

  f('home', 'Support packages teaser', 'home.support_eyebrow', 'Label', 'text', 'Chat-based support'),
  f('home', 'Support packages teaser', 'home.support_heading', 'Heading', 'text', 'Ongoing support, one message away.'),
  f('home', 'Support packages teaser', 'home.support_body', 'Text', 'textarea',
    'Choose a support package for chat-based counselling and begin on WhatsApp whenever you are ready.'),
  f('home', 'Support packages teaser', 'home.support_cta', 'Button label', 'text', 'View all support packages'),

  f('home', 'The FUAD approach', 'home.approach_eyebrow', 'Label', 'text', 'The FUAD Approach'),
  f('home', 'The FUAD approach', 'home.approach_heading', 'Heading', 'text', 'Counselling is not about someone handing you all the answers.'),
  f('home', 'The FUAD approach', 'home.approach_body', 'Text', 'textarea',
    'It is a space to pause and reflect, understand your emotions, and take an active role in your own growth — with spiritual grounding as a source of steadiness for those who value it.'),
  f('home', 'The FUAD approach', 'home.approach_points', 'Points', 'list',
    lines('Pause and reflect', 'Understand your emotions', 'Explore patterns', 'Navigate relationships', 'Work through challenges',
      'Develop healthier responses', 'Understand yourself better', 'Draw on spiritual grounding'), 'One per line'),
  f('home', 'The FUAD approach', 'home.approach_image', 'Image', 'image', '/approach.png'),

  f('home', 'Why FUAD', 'home.why_eyebrow', 'Label', 'text', 'Why FUAD'),
  f('home', 'Why FUAD', 'home.why_heading', 'Heading', 'text', 'Support that is accessible, private, and genuinely human.'),
  f('home', 'Why FUAD', 'home.why_pillars', 'Cards', 'pairs',
    lines(
      'Online & accessible | Counselling that reaches you wherever you are, without the barriers of travel or fixed schedules.',
      'Spiritually grounded | A spiritual foundation that supports emotional wellbeing, offered with respect for your own beliefs.',
      'Confidential | A space designed for thoughtful and private conversations.',
      'Compassionate | You are met with care and without judgment.',
      'Person-centred | Your experiences and perspective matter here.',
      'Professional | Support that is thoughtful, responsible, and grounded in professional practice.',
    ), 'One per line: Title | Description'),

  f('home', 'Events teaser', 'home.events_eyebrow', 'Label', 'text', 'Events'),
  f('home', 'Events teaser', 'home.events_heading', 'Heading', 'text', 'Webinars, discussions, and awareness sessions'),
  f('home', 'Events teaser', 'home.events_body', 'Text', 'textarea',
    'Join FUAD for calm, supportive conversations on emotional wellbeing, relationships, and spiritual approaches to inner steadiness.'),
  f('home', 'Events teaser', 'home.events_cta', 'Button label', 'text', 'View all events'),

  // ---------------- ABOUT ----------------
  f('about', 'Page header', 'about.hero_eyebrow', 'Label', 'text', 'About FUAD'),
  f('about', 'Page header', 'about.hero_title', 'Title', 'text', 'A compassionate space, wherever you are.'),
  f('about', 'Page header', 'about.hero_description', 'Intro text', 'textarea',
    'FUAD is an online counselling service with a spiritual foundation, offering accessible, confidential, and compassionate support for emotional and relationship wellbeing.'),
  f('about', 'What FUAD is', 'about.what_heading', 'Heading', 'text', 'What FUAD is'),
  f('about', 'What FUAD is', 'about.what_body', 'Text', 'textarea',
    'FUAD is an online counselling platform that brings professional emotional support together with a spiritual foundation. Through chat-based support, conversations, and events, FUAD helps people understand themselves, strengthen their relationships, and move through difficult seasons of life with greater steadiness.'),
  f('about', 'What FUAD is', 'about.image', 'Image', 'image', '/about.png'),
  f('about', 'Why FUAD exists', 'about.why_heading', 'Heading', 'text', 'Why FUAD exists'),
  f('about', 'Why FUAD exists', 'about.why_body', 'Text', 'textarea',
    'Many people struggle quietly — with stress, anxiety, overthinking, or tensions at home — because support feels out of reach, unfamiliar, or disconnected from their values. FUAD exists to make thoughtful support easier to reach: online, private, and respectful of who you are and what matters to you.'),
  f('about', 'Counselling approach', 'about.approach_heading', 'Heading', 'text', 'Our counselling approach'),
  f('about', 'Counselling approach', 'about.approach_body', 'Text', 'textarea',
    'Counselling at FUAD is a collaborative process, not a set of instructions. Together with a counsellor you pause, reflect, notice patterns, and explore gentle, realistic steps forward at a pace that feels right. FUAD does not promise guaranteed outcomes; it offers a supportive space in which you take an active role in your own growth.'),
  f('about', 'Online, confidential, spiritual', 'about.online_heading', 'Online accessibility — heading', 'text', 'Online and accessible'),
  f('about', 'Online, confidential, spiritual', 'about.online_body', 'Online accessibility — text', 'textarea',
    'Support happens online, so you can reach FUAD from home, at your own pace, and without the barriers of travel. Starting is simple: begin a conversation on WhatsApp and take it from there.'),
  f('about', 'Online, confidential, spiritual', 'about.confidential_heading', 'Confidentiality — heading', 'text', 'Confidential by design'),
  f('about', 'Online, confidential, spiritual', 'about.confidential_body', 'Confidentiality — text', 'textarea',
    'What you share is treated with care and respect. FUAD is designed for private, thoughtful conversations where you can speak honestly without fear of judgment.'),
  f('about', 'Online, confidential, spiritual', 'about.spiritual_heading', 'Spiritual element — heading', 'text', 'The spiritual element'),
  f('about', 'Online, confidential, spiritual', 'about.spiritual_body', 'Spiritual element — text', 'textarea',
    'Spiritual wellbeing is part of how many people find meaning, patience, and strength. FUAD weaves a spiritual foundation into its approach, offered with respect for your own beliefs and pace, alongside professional counselling practice.'),
  f('about', 'Areas of support', 'about.areas_heading', 'Heading', 'text', 'Areas of support'),
  f('about', 'Areas of support', 'about.areas', 'Areas', 'list',
    lines('Marriage and relationship support', 'Stress and emotional overwhelm', 'Anxiety and overthinking',
      'Personal growth and self-understanding', 'Communication in relationships', 'Life transitions',
      'Spiritual approaches to emotional wellbeing'), 'One per line'),
  f('about', 'How FUAD is different', 'about.different_heading', 'Heading', 'text', 'How FUAD is different'),
  f('about', 'How FUAD is different', 'about.different', 'Points', 'pairs',
    lines(
      'Online-first | Built for online access from the start, not adapted from in-person services.',
      'Spiritually grounded | A spiritual foundation is part of the approach, not an afterthought.',
      'Simple to begin | Support packages and conversations start on WhatsApp — no complicated booking.',
      'Confidential and compassionate | Privacy and kindness shape every interaction.',
    ), 'One per line: Title | Description'),
  f('about', 'Closing quote', 'about.quote', 'Quote', 'text', "You don't need to have everything figured out before reaching out."),
  f('about', 'Closing quote', 'about.quote_body', 'Text under the quote', 'textarea',
    'Counselling at FUAD is not about being told what to do. It is a collaborative space to reflect, understand, and take an active role in your own growth.'),

  // ---------------- SUPPORT ----------------
  f('support', 'Page header', 'support.hero_eyebrow', 'Label', 'text', 'Support'),
  f('support', 'Page header', 'support.hero_title', 'Title', 'text', 'Chat-based counselling support.'),
  f('support', 'Page header', 'support.hero_description', 'Intro text', 'textarea',
    'Choose a support package for ongoing, confidential, chat-based counselling with a spiritual foundation — and begin on WhatsApp whenever you are ready.'),
  f('support', 'How it works', 'support.steps_heading', 'Heading', 'text', 'How support works'),
  f('support', 'How it works', 'support.steps', 'Steps', 'pairs',
    lines(
      'View packages | Compare the support packages below and choose the one that fits.',
      'Select a package | Tap the WhatsApp button on your chosen package.',
      'Start on WhatsApp | A message naming your package is ready for you to send to FUAD.',
    ), 'One per line: Title | Description'),
  f('support', 'Packages', 'support.packages_heading', 'Heading', 'text', 'Support packages'),
  f('support', 'Packages', 'support.packages_description', 'Text', 'textarea', 'Choose the level of chat-based support that suits you.'),
  f('support', 'Packages', 'support.whatsapp_template', 'WhatsApp message', 'text',
    'Assalamualaikum, I want to subscribe to the {package} Package.',
    'Use {package} where the package name should appear. It is filled in automatically for each package.'),
  f('support', 'Packages', 'support.empty_message', 'Message when there are no packages', 'textarea',
    'Support packages are being updated. Please contact FUAD on WhatsApp to learn more.'),
  f('support', 'Note', 'support.disclaimer', 'Note under the packages', 'textarea',
    'Chat-based counselling is a supportive service and is not an emergency service. If you are in immediate danger or crisis, please contact your local emergency services.'),

  // ---------------- EVENTS ----------------
  f('events', 'Page header', 'events.hero_eyebrow', 'Label', 'text', 'Events'),
  f('events', 'Page header', 'events.hero_title', 'Title', 'text', 'Webinars, discussions, and awareness sessions.'),
  f('events', 'Page header', 'events.hero_description', 'Intro text', 'textarea',
    'Join FUAD for calm, supportive conversations on emotional wellbeing, relationships, and spiritual approaches to inner steadiness.'),
  f('events', 'Listing', 'events.empty_message', 'Message when there are no events', 'textarea',
    'No events are scheduled right now. Please check back soon, or contact FUAD on WhatsApp.'),

  // ---------------- COUNSELLORS ----------------
  f('counsellors', 'Heading', 'counsellors.eyebrow', 'Label', 'text', 'Counsellors'),
  f('counsellors', 'Heading', 'counsellors.title', 'Title', 'text', "The people you'll be speaking with"),
  f('counsellors', 'Heading', 'counsellors.description', 'Text', 'textarea',
    'A small, considered team offering a warm and non-judgmental space, online. Take your time getting to know each of them.'),

  // ---------------- GENERAL ----------------
  f('general', 'Closing call-to-action', 'cta.heading', 'Heading', 'text', "You don't have to figure everything out alone."),
  f('general', 'Closing call-to-action', 'cta.supporting', 'Text', 'textarea', "Whenever you're ready, we're here to listen."),
]

const defaults: Record<string, string> = Object.fromEntries(
  contentFields.map((field) => [field.key, field.default]),
)

export type PageContent = {
  text: (key: string) => string
  list: (key: string) => string[]
  pairs: (key: string) => { title: string; body: string }[]
}

function makeContent(overrides: Record<string, string>): PageContent {
  const text = (key: string) => {
    const value = overrides[key]
    return value != null && value.trim() !== '' ? value : (defaults[key] ?? '')
  }
  return {
    text,
    list: (key) => toList(text(key)),
    pairs: (key) =>
      toList(text(key)).map((line) => {
        const i = line.indexOf('|')
        return i === -1
          ? { title: line.trim(), body: '' }
          : { title: line.slice(0, i).trim(), body: line.slice(i + 1).trim() }
      }),
  }
}

/**
 * Loads the saved page copy once per request (React cache) and merges it over
 * the defaults. Never throws — any failure just means the defaults are used.
 */
export const getPageContent = cache(async (): Promise<PageContent> => {
  const supabase = getSupabasePublicClient()
  if (!supabase) return makeContent({})
  try {
    const { data, error } = await supabase.from('site_content').select('key, value')
    if (error || !data) return makeContent({})
    return makeContent(
      Object.fromEntries((data as { key: string; value: string }[]).map((r) => [r.key, r.value])),
    )
  } catch {
    return makeContent({})
  }
})
