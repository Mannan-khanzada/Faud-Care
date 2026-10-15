const testimonials = [
  {
    name: "Ayesha R.",
    role: "Counselling Client",
    text: "I came into counselling feeling completely overwhelmed. The sessions gave me a safe space to understand what I was feeling and helped me take small, practical steps forward.",
    initials: "AR",
  },
  {
    name: "Sarah M.",
    role: "Individual Counselling",
    text: "For the first time, I felt that I could talk openly without being judged. The guidance I received helped me understand myself much better.",
    initials: "SM",
  },
  {
    name: "Hamza K.",
    role: "Personal Development",
    text: "Counselling helped me rebuild my confidence and deal with situations I had been avoiding for a long time. I now feel much more in control of my decisions.",
    initials: "HK",
  },
  {
    name: "Mariam A.",
    role: "Relationship Counselling",
    text: "The sessions helped me communicate more clearly and understand my emotions instead of reacting to them. It made a real difference in my relationships.",
    initials: "MA",
  },
  {
    name: "Ali S.",
    role: "Stress & Anxiety Support",
    text: "I learned practical ways to manage stress and stop feeling overwhelmed by everything at once. The process was supportive and genuinely helpful.",
    initials: "AS",
  },
  {
    name: "Anonymous Client",
    role: "Counselling Services",
    text: "Taking the first step was difficult, but counselling gave me the support I needed. I'm grateful for the progress I've made and the perspective I've gained.",
    initials: "AC",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f7f9f7] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Client Experiences
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            A Safe Space to
            <span className="text-emerald-600"> Be Heard</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            Everyone&apos;s journey is different. Here are some experiences
            shared by clients who chose to take the first step.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Quote */}
              <div className="mb-5 flex items-center justify-between">
                <span className="text-5xl font-serif leading-none text-emerald-200">
                  &ldquo;
                </span>

                <div className="flex gap-1 text-amber-400" aria-label="5 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.78l-5.2 2.74.99-5.8-4.21-4.1 5.82-.85L10 1.5z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <p className="min-h-[145px] text-[15px] leading-7 text-gray-600">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-gray-100" />

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                  {testimonial.initials}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}