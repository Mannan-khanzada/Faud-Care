import { getSupabasePublicClient } from '@/lib/supabase/server'

export type Faq = {
  id: string
  question: string
  answer: string
  published: boolean
}

/** CMS-editable FAQ content. Answers avoid guaranteed outcomes or claims. */
export const faqs: Faq[] = [
  {
    id: 'what-is-counselling',
    question: 'What is counselling?',
    answer:
      'Counselling is a supportive conversation with a trained counsellor in a private, non-judgmental space. It can help you make sense of what you are experiencing, reflect on your thoughts and feelings, and explore what you would like to move towards.',
    published: true,
  },
  {
    id: 'is-it-right-for-me',
    question: 'How do I know if counselling is right for me?',
    answer:
      'You do not need to have everything figured out, or to be in crisis, to benefit from counselling. If you feel you would value a space to pause, reflect, and be heard, counselling may be worth exploring. You are welcome to start a conversation with FUAD before deciding.',
    published: true,
  },
  {
    id: 'what-happens-in-a-session',
    question: 'What happens during a session?',
    answer:
      'Sessions are led at your pace. An early conversation usually focuses on understanding what brings you here. From there, you and your counsellor explore your experience together. There is no pressure to share more than you feel ready to.',
    published: true,
  },
  {
    id: 'how-to-choose-a-counsellor',
    question: 'How do I choose a counsellor?',
    answer:
      'You can read each counsellor’s profile to get a sense of who they are. If you are unsure, you are welcome to start a conversation with FUAD and we can help you consider what might suit you.',
    published: true,
  },
  {
    id: 'confidential',
    question: 'Are sessions confidential?',
    answer:
      'FUAD is designed as a space for thoughtful and private conversations. Details about confidentiality are shared with you as part of beginning counselling. If you have questions beforehand, you are welcome to ask.',
    published: true,
  },
  {
    id: 'how-do-i-start',
    question: 'How do I start?',
    answer:
      'You can start a conversation through our WhatsApp if you would like to ask something first. There is no pressure — you can begin at your own pace.',
    published: true,
  },
  {
    id: 'online-or-in-person',
    question: 'Are sessions online or in person?',
    answer:
      'Session format details are being confirmed. To find out the current options, please start a conversation with FUAD.',
    published: true,
  },
  {
    id: 'how-much',
    question: 'How much does counselling cost?',
    answer:
      'Pricing information is currently being updated. For current session details, please start a conversation with FUAD.',
    published: true,
  },
  {
    id: 'how-long',
    question: 'How long is a session?',
    answer:
      'Session length details are being confirmed and will be shared with you when you enquire or book.',
    published: true,
  },
  {
    id: 'contact-before-deciding',
    question: 'Can I contact FUAD before deciding?',
    answer:
      'Yes. You are welcome to start a conversation with FUAD on WhatsApp to ask questions before deciding whether counselling feels right for you.',
    published: true,
  },
]

/** Reads published FAQs from Supabase; falls back to the static seed list. */
export async function getPublishedFaqs(): Promise<Faq[]> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return faqs.filter((f) => f.published)

  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer, published')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (error || !data) return faqs.filter((f) => f.published)
  return data
}
