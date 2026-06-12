import { motion } from 'framer-motion'
import { Star, Heart, Quote } from 'lucide-react'
import { fadeUp, staggerContainer, floatSlow } from '@/lib/animations'

const TESTIMONIALS = [
  {
    id: '1',
    quote: 'Haliberry Cake made our wedding cake unforgettable—the design and flavor were perfect.',
    name: 'Avery M.',
    role: 'Bride',
    image: '/test.jpg'
  },
  {
    id: '2',
    quote: 'The baking class was fun, informative, and full of delicious samples.',
    name: 'Jordan L.',
    role: 'Home Baker',
    image: '/testim.jpg'
  },
  {
    id: '3',
    quote: 'Such warm customer service and incredible attention to every detail.',
    name: 'Sofie P.',
    role: 'Event Planner',
    image: '/testi.webp'
  },
  {
    id: '4',
    quote: 'Every bite tells a story of passion and precision. Simply heavenly!',
    name: 'Elena R.',
    role: 'Food Critic',
    image: '/testimo.webp'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-12 lg:py-24 overflow-hidden" style={{
      background: 'linear-gradient(180deg, var(--cream-white) 0%, var(--cream) 100%)'
    }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 left-0 w-[180px] h-[180px] rounded-full opacity-[0.08] hidden lg:block"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(168,144,128,0.15), transparent 70%)',
            transform: 'translate(-20%, -20%)'
          }}
          variants={floatSlow}
          initial="rest"
          animate="float"
          transition={{ delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full opacity-[0.06] hidden lg:block"
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(168,144,128,0.12), transparent 70%)',
            transform: 'translate(20%, 20%)'
          }}
          variants={floatSlow}
          initial="rest"
          animate="float"
          transition={{ delay: 1.2 }}
        />

        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span variants={fadeUp} className="section-eyebrow block mb-3">
            Voices of Delight
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title">
            What Our Clients Say
            <br />
            <span className="block inline-flex items-center justify-center gap-2 mt-4">
              <Quote size={20} style={{ color: 'var(--peach)' }} />
              <Heart size={20} style={{ color: 'var(--peach)', opacity: 0.7 }} />
              <Quote size={20} style={{ color: 'var(--peach)' }} />
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle">
            Each testimonial reflects a moment of joy, celebration, and trust—crafted with the same care as our cakes.
          </motion.p>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="group relative"
            >
              {/* Testimonial Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-luxury transition-all duration-500 hover:shadow-luxury-lg"
                   style={{
                     border: '1px solid rgba(168,144,128,0.15)',
                     background: 'linear-gradient(to bottom right, white, rgba(250,248,246,0.8))'
                   }}
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full"
                     style={{
                       background: 'rgba(168,144,128,0.1)',
                       color: 'var(--peach)'
                     }}>
                  <Quote size={16} />
                </div>

                {/* Client Image or Placeholder */}
                <div className="relative mb-6">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.name}'s testimonial`}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[var(--peach)]/20"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full flex items-center justify-center"
                         style={{
                           background: 'linear-gradient(135deg, rgba(168,144,128,0.1) 0%, rgba(212,169,160,0.05) 100%)',
                           border: '2px dashed rgba(168,144,128,0.3)'
                         }}>
                      <Heart size={18} style={{ color: 'var(--peach)', opacity: 0.8 }} />
                    </div>
                  )}
                </div>

                {/* Quote Text */}
                <blockquote className="font-serif text-base leading-relaxed text-[var(--text-primary)] mb-6 italic relative pl-4">
                  <span className="absolute -left-3 -top-1 text-[var(--peach)] opacity-50 text-xs">“</span>
                  “{item.quote}”
                  <span className="absolute right-3 bottom-1 text-[var(--peach)] opacity-50 text-xs">”</span>
                </blockquote>

                {/* Client Info */}
                <div className="space-y-2">
                  <p className="font-serif font-medium text-[var(--text-primary)]">{item.name}</p>
                  <p className="font-sans text-sm text-[var(--text-secondary)] tracking-wider uppercase letter-spacing-[0.5px]">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Decorative accent */}
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--peach) 0%, rgba(168,144,128,0.3) 100%)',
                  transform: 'rotate(45deg)',
                  opacity: '0.7'
                }}
                variants={{
                  rest: { scale: 1 },
                  float: { scale: [1, 1.1, 1] }
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative flourish */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120px] h-[80px] opacity-[0.04] hidden lg:block"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 50\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M5,45 Q15,35 25,40 T45,45 Q55,35 65,40 T85,45 Q95,35 95,25 L95,5 L5,5 Z\' fill=\'none\' stroke=\'%23957158\' stroke-width=\'1.5\' opacity=\'0.4\'/%3E%3C/svg%3E\")'
          }}
          variants={floatSlow}
          initial="rest"
          animate="float"
          transition={{ delay: 0.8 }}
        />
      </div>
    </section>
  )
}
