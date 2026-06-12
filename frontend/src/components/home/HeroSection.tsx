// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\home\HeroSection.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Cake, Sparkles, Heart, ShoppingBag} from 'lucide-react'
import { heroTextReveal, imageFloat, floatSlow } from '@/lib/animations'


export default function HeroSection() {
  const featuredCakes = [
    {
      image: '/images/cakes/cake1.jpg',
      title: 'Wedding Cakes'
    },
    {
      image: '/images/cakes/cake2.jpg',
      title: 'Birthday Cakes'
    },
    {
      image: '/images/cakes/cake3.jpg',
      title: 'Cupcakes'
    },
    {
      image: '/images/cakes/cake4.jpg',
      title: 'Custom Orders'
    }
  ]
  return (
    <section
  className="relative min-h-screen flex items-center overflow-hidden bg-[var(--cream)]"
  style={{
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Ccircle fill=\'%23A89080\' fill-opacity=\'0.05\' cx=\'30\' cy=\'30\' r=\'6\'/%3E%3Cpath d=\'M36 34q-4 0-6-3t-2-6q0-4 3-6t6-2q4 0 6 3t2 6q0 4-3 6t-6 2z\' fill=\'%23A89080\' fill-opacity=\'0.05\'/%3E%3C/g%3E%3C/svg%3E")'
  }}
>



      {/* Ambient orb blobs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.02), transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.02), transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      {/* Elegant floating cake layers */}
      <motion.div
        className="absolute top-1/6 left-[-5%] w-[300px] h-[400px] opacity-[0.15] hidden lg:block"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168,144,128,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'rotate(-15deg)'
        }}
        variants={floatSlow}
        initial="rest"
        animate="float"
        transition={{ delay: 0.5 }}
      />

      {/* Delicate cake stand silhouette */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[200px] h-[150px] opacity-[0.08] hidden lg:block"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5,45 Q15,35 25,40 T45,45 Q55,35 65,40 T85,45 Q95,35 95,25 L95,5 L5,5 Z' fill='none' stroke='%23A89080' stroke-width='1.5' opacity='0.3'/%3E%3C/svg%3E\")",
          pointerEvents: 'none'
        }}
        variants={floatSlow}
        initial="rest"
        animate="float"
        transition={{ delay: 1.2 }}
      />

      {/* Floating decorative elements - enhanced */}
      <motion.div
        className="absolute top-1/4 right-8 lg:right-20 w-[340px] h-[420px] rounded-3xl overflow-hidden opacity-[0.08] hidden md:block"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(168,144,128,0.08)',
          backdropFilter: 'blur(10px)'
        }}
        variants={imageFloat}
        initial="rest"
        animate="float"
      />
      <motion.div
        className="absolute top-1/3 right-12 lg:right-24 w-[280px] h-[340px] rounded-3xl overflow-hidden hidden lg:block"
        style={{
          background: 'rgba(168,144,128,0.03)',
          border: '1px solid rgba(168,144,128,0.12)',
          backdropFilter: 'blur(15px)'
        }}
        variants={imageFloat}
        initial="rest"
        animate="float"
        transition={{ delay: 1.5 }}
      />

      {/* Elegant sprinkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[6px] h-[6px] bg-[var(--peach)]/20 rounded-full" />
        <div className="absolute bottom-20 right-1/3 w-[4px] h-[4px] bg-[var(--blush)]/15 rounded-full" />
        <div className="absolute top-1/3 left-3/4 w-[5px] h-[5px] bg-[var(--petal)]/18 rounded-full" />
        <div className="absolute bottom-1/3 left-1/5 w-[3px] h-[3px] bg-[var(--golden)]/12 rounded-full" />
      </div>

      {/* Floating decorative cake silhouette shapes */}
      <motion.div
        className="absolute top-1/4 right-8 lg:right-20 w-[340px] h-[420px] rounded-3xl overflow-hidden opacity-30 hidden md:block"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        variants={imageFloat}
        initial="rest"
        animate="float"
      />
      <motion.div
        className="absolute top-1/3 right-12 lg:right-24 w-[280px] h-[340px] rounded-3xl overflow-hidden hidden lg:block"
        style={{ background: 'rgba(168,144,128,0.06)', border: '1px solid rgba(168,144,128,0.12)' }}
        variants={imageFloat}
        initial="rest"
        animate="float"
        transition={{ delay: 1.5 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[1rem] pb-20 lg:pt-[2rem]">
        
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={heroTextReveal}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-px bg-[var(--peach)]" />
            <span className="font-sans text-xs font-medium tracking-[0.22em] uppercase" style={{ color: 'var(--peach)' }}>
              Established 2020 • London's Finest
            </span>
          </motion.div>

          {/* Headline - Enhanced with gradient and elegant styling */}
          <motion.h1
            custom={1}
            variants={heroTextReveal}
            initial="hidden"
            animate="visible"
            className="font-serif mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: '1.05',
              fontWeight: 600,
              background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--peach) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Handcrafted with Heart
          </motion.h1>

          {/* Subheadline - Refined */}
          <motion.p
            custom={2}
            variants={heroTextReveal}
            initial="hidden"
            animate="visible"
            className="font-sans font-light mb-12 max-w-xl"
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}
          >
            Luxury celebration cakes, bespoke dessert boxes, and artisan baking experiences
            crafted in London with intention, warmth, and extraordinary attention to detail.
          </motion.p>

          {/* CTA Buttons - Enhanced */}
          <motion.div
            custom={3}
            variants={heroTextReveal}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <Link to="/shop" className="btn-primary">
              <Cake size={18} />
              Explore Collections
              <ArrowRight size={16} />
            </Link>
            <Link to="/cake-classes" className="btn-ghost">
              <Sparkles size={18} />
              Join a Class
              <ArrowRight size={16} />
            </Link>
            <Link to="/cic" className="btn-ghost">
              <Heart size={18} />
              Support Our Mission
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Elegant decorative divider with cake emoji */}
          <motion.div
            custom={4}
            variants={heroTextReveal}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-6 mt-16 pt-10"
            style={{ borderTop: '1px solid rgba(168,144,128,0.15)' }}
          >
            <div className="w-[60px] h-[1px] bg-[var(--peach)]/30" />
            <span className="font-serif text-[var(--peach)] text-xl">🎂</span>
            <div className="w-[60px] h-[1px] bg-[var(--peach)]/30" />
          </motion.div>

          {/* Social proof strip - Enhanced */}
          <motion.div
            custom={5}
            variants={heroTextReveal}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-8 mt-12"
            style={{
              background: 'rgba(212,169,160,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '2rem',
              padding: '1rem 1.5rem',
              border: '1px solid rgba(168,144,128,0.2)'
            }}
          >
            {[
              { value: '500+', label: 'Cakes Made', icon: '🎂' },
              { value: '4.9★', label: 'Rating', icon: '⭐' },
              { value: '6yrs', label: 'Crafting', icon: '👩‍🍳' },
              { value: 'CIC', label: 'Community', icon: '❤️' },
            ].map(({ value, label, icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="text-2xl">
                  {icon}
                </div>
                <div className="text-center">
                  <p className="font-serif font-semibold" style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{value}</p>
                  <p className="font-sans text-xs tracking-wide" style={{ color: 'var(--text-muted)' }}>{label}</p>
                </div>
              </div>
            ))}

            </motion.div>
    </div>

    {/* Premium Cake Showcase */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="hidden lg:block"
    >
      <div className="grid grid-cols-2 gap-5">

        {featuredCakes.map((cake, index) => (
          <Link
            key={index}
            to="/shop"
            className="group relative overflow-hidden rounded-[28px] shadow-xl"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={cake.image}
                alt={cake.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-serif text-white text-lg font-semibold">
                    {cake.title}
                  </h3>

                  <p className="text-white/80 text-sm">
                    View Collection
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <ShoppingBag
                    size={18}
                    className="text-[var(--peach)]"
                  />
                </div>

              </div>
            </div>
          </Link>
        ))}

      </div>

      <div
        className="mt-6 rounded-3xl p-6"
        style={{
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(168,144,128,0.15)'
        }}
      >
        <p
          className="font-serif text-xl mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Explore Our Signature Collection
        </p>

        <p
          className="font-sans text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Wedding cakes, celebration cakes, cupcakes and bespoke dessert
          creations crafted with elegance and care.
        </p>
      </div>
    </motion.div>

      </div>

      {/* Organic bottom wave - more sophisticated */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path
            d="M0,60 C180,40 360,80 540,60 T1260,60 L1440,100 L0,100 Z"
            fill="url(#hero-gradient)"
          />
          <defs>
            <linearGradient id="hero-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--cream)" />
              <stop offset="100%" stop-color="var(--cream-white)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}
