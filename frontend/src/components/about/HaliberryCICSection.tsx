// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\about\AboutHaliberry.tsx
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

/* ─────────────────────────────────────────────
   Re-usable section heading
───────────────────────────────────────────── */
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div variants={fadeUp} className="mb-8">
      <span
        className="inline-block font-sans text-xs font-medium tracking-[0.22em] uppercase mb-3"
        style={{ color: 'var(--peach)' }}
      >
        {eyebrow}
      </span>
      <h2
        className="font-serif font-semibold leading-tight"
        style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Body paragraph
───────────────────────────────────────────── */
function Para({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      className="font-sans font-light leading-[1.9]"
      style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}
    >
      {children}
    </motion.p>
  )
}

/* ─────────────────────────────────────────────
   Thin divider
───────────────────────────────────────────── */
function Divider() {
  return (
    <motion.div
      variants={fadeUp}
      className="my-12 flex items-center gap-4"
    >
      <span className="flex-1 h-px" style={{ background: 'var(--peach)', opacity: 0.3 }} />
      <span
        className="font-serif text-xs tracking-widest uppercase"
        style={{ color: 'var(--peach)', opacity: 0.6 }}
      >
        ✦
      </span>
      <span className="flex-1 h-px" style={{ background: 'var(--peach)', opacity: 0.3 }} />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function AboutHaliberry() {
  return (
    <article style={{ background: 'var(--cream)' }}>

      {/* ══════════════════════════════════════
          SECTION 1 — My Story (editorial row)
      ══════════════════════════════════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:gap-24 items-start">

            {/* ── Left: story copy ── */}
            <motion.div
              className="space-y-7"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <SectionHeading
                eyebrow="About Halimot & Haliberry"
                title="My Story: From Resilience to Sugar Artistry"
              />

              <Para>
                When I was a child growing up in Africa, my dream was to become a doctor.
                The training and discipline started early, fuelled by a deep, natural love for
                looking after people. I have always been a people person — someone deeply moved
                by humanity, connection and making others happy.
              </Para>
              <Para>
                But life took an unexpected turn.
              </Para>
              <Para>
                At a young age, my life, my choices and my dreams were stolen from me. As a
                survivor of FGM, human trafficking and homelessness, I faced dark chapters where
                it felt like my future had been erased.
              </Para>
              <motion.p
                variants={fadeUp}
                className="font-sans font-semibold leading-[1.85]"
                style={{ color: 'var(--text-primary)', fontSize: '1.0625rem' }}
              >
                But a stolen childhood did not mean a defeated life.
              </motion.p>
              <Para>
                Through the grace of God and the incredible, life-changing support of
                organisations such as the British Red Cross, Ella's and Luminary Bakery,
                I found a path to rebuilding my life and rediscovered myself.
              </Para>
              <Para>
                In 2016, graduating from Luminary Bakery opened a door I never knew existed:
                the beautiful and precise science of baking.
              </Para>
            </motion.div>

            {/* ── Right: portrait placeholder card ── */}
            <motion.div
              className="relative"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Portrait frame */}
              <div
                className="rounded-[2rem] overflow-hidden shadow-luxury"
                style={{ border: '1px solid rgba(246,226,181,0.5)' }}
              >
                <div className="aspect-[3/4] relative" style={{ background: 'linear-gradient(160deg, var(--peach) 0%, var(--cream) 100%)' }}>
                  <img
                    src="/halib.png"
                    alt="Halimot — Founder of Haliberry Cake"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      img.style.display = 'none'
                    }}
                  />
                  {/* Elegant name tag pinned to bottom */}
                  <div
                    className="absolute inset-x-0 bottom-0 px-8 py-6"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)' }}
                  >
                    <p className="font-serif font-semibold text-white text-xl leading-tight">
                      Halimot
                    </p>
                    <p className="font-sans text-xs tracking-[0.18em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      Founder, Haliberry Cake
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative accent dot */}
              <div
                className="absolute -bottom-5 -left-5 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: 'var(--peach)', opacity: 0.12 }}
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CENTRED PULL-QUOTE
      ══════════════════════════════════════ */}
      <section className="py-10 lg:py-16" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.figure
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {/* Opening mark */}
            <span
              className="block font-serif leading-none mb-4 select-none"
              style={{ fontSize: '5rem', color: 'var(--peach)', opacity: 0.35, lineHeight: 1 }}
              aria-hidden="true"
            >
              "
            </span>
            <blockquote>
              <p
                className="font-serif italic font-light"
                style={{
                  fontSize: 'clamp(1.45rem, 3.2vw, 2.1rem)',
                  lineHeight: '1.65',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.01em',
                }}
              >
                Every cake, class and project created through Haliberry carries a deeper
                purpose: to inspire, uplift and remind people that beautiful things can grow
                even through the most difficult journeys.
              </p>
            </blockquote>
            {/* Attribution line */}
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              <span className="w-10 h-px" style={{ background: 'var(--peach)' }} />
              <span
                className="font-sans text-xs font-medium tracking-[0.22em] uppercase"
                style={{ color: 'var(--peach)' }}
              >
                Halimot — Founder, Haliberry
              </span>
              <span className="w-10 h-px" style={{ background: 'var(--peach)' }} />
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — Mastering the Craft
      ══════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              className="space-y-7"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <SectionHeading
                eyebrow="The Craft"
                title="Mastering the Art"
              />
              <Para>
                I discovered that baking wasn't just a hobby; it became a canvas for my
                resilience and creativity.
              </Para>
              <Para>
                Determined to become the very best at my craft, I invested years into learning
                and development. I spent countless hours researching, studying techniques, watching
                master tutorials and investing in private one-to-one masterclasses with leading
                cake designers to perfect my skills.
              </Para>
              <Para>
                In 2017, Haliberry Cake was born in East London.
              </Para>
              <Para>
                What started as a healing outlet quickly evolved into a luxury cake brand known
                for elegant designs, beautiful flavours and exceptional attention to detail.
              </Para>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — Community (two-col)
      ══════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Overline + headline */}
          <motion.div
            className="max-w-3xl mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeading
              eyebrow="Creativity & Community"
              title="More than Cake"
            />
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 items-start">

            {/* Left copy */}
            <motion.div
              className="space-y-7"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <Para>
                My childhood desire to care for people never left me; it simply found a new home
                in baking.
              </Para>
              <Para>
                Every celebration cake, dessert table and baking masterclass I create is designed
                to bring joy, comfort and a touch of luxury to life's most treasured moments.
              </Para>
              <Para>
                Because I know what it means to be supported, I am deeply committed to
                supporting others.
              </Para>
              <Para>
                In 2024, I formally founded Haliberry CIC, the community interest branch of my
                business. Through Haliberry CIC, I use baking and creativity to provide skills
                training, confidence-building opportunities and safe, empowering spaces for
                minority and vulnerable groups.
              </Para>
            </motion.div>

            {/* Right: closing message card */}
            <motion.div
              className="rounded-[2rem] p-10 space-y-6"
              style={{
                background: 'linear-gradient(145deg, var(--peach) 0%, #e8a87c 100%)',
              }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="font-sans font-light leading-[1.9] text-white" style={{ fontSize: '1.0625rem' }}>
                When you choose Haliberry, you are not simply ordering a luxury cake.
              </p>
              <p className="font-sans font-light leading-[1.9] text-white" style={{ fontSize: '1.0625rem' }}>
                You are supporting a journey of survival, celebrating resilience and helping to
                create opportunities for others through community empowerment.
              </p>
              <Divider />
              <p
                className="font-serif italic font-light text-white"
                style={{ fontSize: 'clamp(1.15rem, 2vw, 1.35rem)', lineHeight: '1.7' }}
              >
                Welcome to Haliberry — where we create beauty, celebrate community and bake
                with heart.
              </p>
              {/* Attribution */}
              <p className="font-sans text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
                — Halimot
              </p>
            </motion.div>

          </div>
        </div>
      </section>

    </article>
  )
}