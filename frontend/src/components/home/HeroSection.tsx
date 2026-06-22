// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\home\HeroSection.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Cake } from 'lucide-react';
import { heroTextReveal, imageFloat } from '@/lib/animations';

export default function HeroSection() {
  const featuredCakes = [
    { image: 'cake.avif', title: ' 🎂 Celebration Cakes' },
    { image: 'cake.webp', title: '💍 Wedding Cakes' },
    { image: 'cakes.jpg', title: '🧁 Cupcakes' },
    { image: 'cakess.jpg', title: '🍞 Loaf Cakes' },
    { image: 'cakess.jpg', title: '🍪 Cookies & Cookie Dippers' },
  ];

  const featuredCakes1 = [
    { image: 'cakeee.jpeg', title: '🍰 Dessert Boxes' },
    { image: 'cakeeeeee.jpeg', title: '🍩 Sweet Treats' },
    { image: 'cakeeee.jpeg', title: '😊 African Treats Collection' },
    { image: 'cakee.jpeg', title: '🎓 Learn With Haliberry' },
  ];

  const sliderImages = [
    'mmmimage.jpg',
    ...featuredCakes.map(c => c.image),
    ...featuredCakes1.map(c => c.image),
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p === sliderImages.length - 1 ? 0 : p + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const allCakes = [...featuredCakes, ...featuredCakes1];

  return (
    <section className="relative flex flex-col items-center justify-start overflow-hidden bg-[var(--cream)] min-h-screen">

      {/* Frosting Drip Decoration — top accent */}
      <svg
        viewBox="0 0 1440 32"
        className="absolute top-0 left-0 w-full z-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1440,0 L1440,14
            Q1400,26 1360,14 Q1320,2 1280,18 Q1240,30 1200,18
            Q1160,6 1120,20 Q1080,32 1040,18 Q1000,6 960,20
            Q920,32 880,18 Q840,6 800,20 Q760,32 720,18
            Q680,6 640,20 Q600,32 560,18 Q520,6 480,20
            Q440,32 400,18 Q360,6 320,20 Q280,32 240,18
            Q200,6 160,20 Q120,32 80,18 Q40,4 0,16 Z"
          fill="var(--peach)"
          fillOpacity="0.12"
        />
      </svg>

      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 60 60' xmlns='http://w3.org'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23A89080' fill-opacity='0.05' cx='30' cy='30' r='6'/%3E%3Cpath d='M36 34q-4 0-6-3t-2-6q0-4 3-6t6-2q4 0 6 3t2 6q0 4-3 6t-6 2z' fill='%23A89080' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={sliderImages[currentSlide]}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--cream)]/40 via-[var(--cream)]/70 to-[var(--cream)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--cream)]/30 via-transparent to-[var(--cream)]/30" />
      </div>

      {/* Decorative Orbs — desktop only */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[var(--peach)]/10 to-transparent blur-3xl opacity-40 hidden lg:block pointer-events-none" />
      <div className="absolute bottom-32 left-12 w-64 h-64 rounded-full bg-gradient-to-tr from-[var(--blush)]/10 to-transparent blur-3xl opacity-30 hidden lg:block pointer-events-none" />

      {/* ── DESKTOP LAYOUT ──────────────────────────────────────────── */}
      <div className="hidden lg:flex relative z-20 w-full max-w-7xl mx-auto px-8 items-center justify-between pt-36 pb-24 gap-12">
        <div className="flex-1 max-w-2xl">
          <motion.div
            initial="hidden" animate="visible"
            variants={heroTextReveal} custom={0}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-0.5 bg-black" />
            <span className="font-mono text-xs tracking-[3px] uppercase text-black font-medium">
              ESTABLISHED 2020 · LONDON'S FINEST
            </span>
            <div className="w-8 h-0.5 bg-black" />
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible"
            variants={heroTextReveal} custom={1}
            className="font-serif text-7xl xl:text-[5.2rem] leading-[1.05] font-medium tracking-tighter mb-8 text-balance"
            style={{
              background: 'var(--text-new)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Handcrafted with Heart
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible"
            variants={heroTextReveal} custom={2}
            className="text-xl xl:text-2xl leading-relaxed text-[var(--text-secondary)] mb-10"
          >
            Luxury celebration cakes, bespoke dessert boxes, and artisan baking
            experiences crafted in London with intention, warmth, and extraordinary
            attention to detail.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible"
            variants={heroTextReveal} custom={3}
            className="flex gap-4 mb-10"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-3 bg-[var(--peach)] hover:bg-[var(--peach-dark)] transition-all text-white px-10 py-4 rounded-2xl font-medium text-lg shadow-xl shadow-[var(--peach)]/30 active:scale-[0.985]"
            >
              <Cake className="w-5 h-5" />
              Explore Collections
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/cake-classes"
              className="inline-flex items-center justify-center gap-3 border border-[var(--text-secondary)]/40 hover:border-[var(--peach)] hover:text-[var(--peach)] transition-all px-8 py-4 rounded-2xl font-medium text-lg"
            >
              <Sparkles className="w-5 h-5" />
              Join a Class
            </Link>
          </motion.div>

          <motion.div
            initial="hidden" animate="visible"
            variants={heroTextReveal} custom={4}
            className="flex items-center gap-8 text-sm text-[var(--text-secondary)]"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐️</span>
              <span>4.98 · 240+ happy clients</span>
            </div>
            <div className="h-4 w-px bg-[var(--text-secondary)]/30" />
            <div>Featured in Vogue · Time Out · Londonist</div>
          </motion.div>
        </div>

        <motion.div
          variants={imageFloat}
          initial="rest"
          animate="float"
          className="flex-shrink-0 w-[360px]"
        >
          <div
            className="rounded-3xl overflow-hidden shadow-2xl shadow-black/20 aspect-[4/4.7] relative"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(168,144,128,0.25)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={sliderImages[currentSlide]}
                alt="Featured luxury cake"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md text-xs font-medium px-5 py-2.5 rounded-2xl shadow flex items-center gap-2 text-[var(--peach)]">
              <Sparkles className="w-4 h-4" />
              THIS WEEK'S FAVOURITE
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── MOBILE LAYOUT ────────────────────────────────────────────── */}
      <div className="lg:hidden relative z-20 w-full flex flex-col items-center pt-16 pb-8 px-5">

        {/* Eyebrow */}
        <motion.div
          initial="hidden" animate="visible"
          variants={heroTextReveal} custom={0}
          className="inline-flex items-center gap-2 mb-4"
        >
          <div className="w-6 h-0.5 bg-black" />
          <span className="font-mono text-[9px] tracking-[2.5px] uppercase text-black font-medium">
            ESTABLISHED 2020 · LONDON'S FINEST
            </span>
            <div className="w-6 h-0.5 bg-black" />
        </motion.div>

        {/* ── Instagram-style Stories Carousel ── */}
        <motion.div
          initial="hidden" animate="visible"
          variants={heroTextReveal} custom={1}
          className="w-full mb-5"
        >
          {/*
            Horizontal scroll container.
            • overflow-x: auto with snap scrolling
            • scrollbar hidden via [&::-webkit-scrollbar]:hidden + [scrollbar-width:none]
            • px-5 gives breathing room so first/last items don't clip flush to the edge
          */}
          <div
            className="
              flex gap-4 overflow-x-auto
              snap-x snap-mandatory
              px-5
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              scroll-smooth
              touch-pan-x
            "
          >
            {allCakes.map((cake, index) => (
              <Link
                key={index}
                to="/shop"
                className="
                  group flex-none flex flex-col items-center gap-2
                  snap-start
                "
              >
                {/* Peach gradient ring — mimics Instagram story ring */}
                <div
                  className="p-[2.5px] rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, var(--peach) 0%, var(--blush, #e8b4a0) 50%, var(--peach-dark, #b87355) 100%)',
                  }}
                >
                  <div className="p-[2px] rounded-full bg-[var(--cream)]">
                    <div className="w-[62px] h-[62px] rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={cake.image}
                        alt={cake.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-medium text-center text-[var(--text-primary)] opacity-70 group-hover:opacity-100 transition-opacity leading-tight w-[70px]">
                  {cake.title}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial="hidden" animate="visible"
          variants={heroTextReveal} custom={2}
          className="font-serif text-[2.4rem] sm:text-5xl leading-[1.08] font-medium tracking-tighter mb-4 text-center text-balance"
          style={{
            background: 'var(--text-new)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Handcrafted with Heart
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial="hidden" animate="visible"
          variants={heroTextReveal} custom={3}
          className="text-sm sm:text-base text-center leading-relaxed text-[var(--text-secondary)] mb-6 max-w-xs"
        >
          Luxury celebration cakes &amp; bespoke dessert boxes, crafted in London
          with extraordinary care.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden" animate="visible"
          variants={heroTextReveal} custom={4}
          className="flex flex-col w-full max-w-[280px] gap-3 mb-6"
        >
          <Link
            to="/shop"
            className="group inline-flex items-center justify-center gap-2.5 bg-[var(--peach)] hover:bg-[var(--peach-dark)] transition-all text-white px-7 py-3.5 rounded-2xl font-medium text-sm shadow-lg shadow-[var(--peach)]/25 active:scale-[0.985]"
          >
            <Cake className="w-4 h-4" />
            Explore Collections
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/cake-classes"
            className="inline-flex items-center justify-center gap-2.5 border border-[var(--text-secondary)]/40 hover:border-[var(--peach)] hover:text-[var(--peach)] transition-all px-7 py-3.5 rounded-2xl font-medium text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Join a Class
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial="hidden" animate="visible"
          variants={heroTextReveal} custom={5}
          className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[11px] text-[var(--text-secondary)] mb-7"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-base">⭐️</span>
            <span>4.98 · 240+ happy clients</span>
          </div>
          <div className="h-3 w-px bg-[var(--text-secondary)]/30" />
          <div>Vogue · Time Out · Londonist</div>
        </motion.div>

        {/* Showcase Card */}
        <motion.div
          variants={imageFloat}
          initial="rest"
          animate="float"
          className="w-full max-w-[300px] mx-auto"
        >
          <div
            className="rounded-3xl overflow-hidden shadow-xl shadow-black/10 aspect-[4/3.2] relative"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(168,144,128,0.25)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={sliderImages[currentSlide]}
                alt="Featured luxury cake"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-[9px] font-medium px-3.5 py-1.5 rounded-xl shadow flex items-center gap-1.5 text-[var(--peach)] tracking-wide">
              <Sparkles className="w-3 h-3" />
              THIS WEEK'S FAVOURITE
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Desktop circle row ────────────────────────────────── */}
      <div className="hidden lg:block relative z-20 w-full pb-12">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-8 xl:gap-10">
            {allCakes.map((cake, index) => (
              <Link
                key={index}
                to="/shop"
                className="group relative flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                  <img
                    src={cake.image}
                    alt={cake.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-sm font-medium text-center text-[var(--text-primary)] opacity-80 group-hover:opacity-100 transition-opacity px-2">
                  {cake.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[var(--text-secondary)] text-[10px] tracking-widest"
      >
        SCROLL TO EXPLORE
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-current to-transparent" />
      </motion.div>
    </section>
  );
}


// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\home\HeroSection.tsx
// import { useState, useEffect, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowRight, Sparkles, Cake } from 'lucide-react';
// import { heroTextReveal, imageFloat } from '@/lib/animations';
// import { useFeaturedItems } from '@/hooks/useFeaturedItems';
// import { getCategoryHref } from '@/lib/categories';

// // Local fallback images — used only until the admin uploads real photos,
// // or if the API call fails. Keeps the homepage from ever looking broken.
// const FALLBACK_IMAGE = 'mmmimage.jpg';

// export default function HeroSection() {
//   const { data: featuredItems } = useFeaturedItems();

//   // ── Carousel tiles: every active item, in the order the admin set ──
//   const allCakes = useMemo(() => {
//     if (!featuredItems || featuredItems.length === 0) return [];
//     return featuredItems.map(item => ({
//       id: item.id,
//       image: item.image_url || FALLBACK_IMAGE,
//       title: item.title,
//       href: getCategoryHref(item.category_slug),
//     }));
//   }, [featuredItems]);

//   // ── Background slider + "This Week's Favourite" card: only items the ──
//   // ── admin starred via is_showcase. Falls back to all items if none   ──
//   // ── are starred yet, so the section never looks empty.               ──
//   const showcaseItems = useMemo(() => {
//     if (!featuredItems || featuredItems.length === 0) {
//       return [{ id: 'fallback', image: FALLBACK_IMAGE, title: 'Haliberry Cake', href: '/shop' }];
//     }
//     const starred = featuredItems.filter(item => item.is_showcase);
//     const source = starred.length > 0 ? starred : featuredItems;
//     return source.map(item => ({
//       id: item.id,
//       image: item.image_url || FALLBACK_IMAGE,
//       title: item.title,
//       href: getCategoryHref(item.category_slug),
//     }));
//   }, [featuredItems]);

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     if (showcaseItems.length <= 1) return;
//     const timer = setInterval(() => {
//       setCurrentSlide((p) => (p === showcaseItems.length - 1 ? 0 : p + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [showcaseItems.length]);

//   // Guard against index drift if showcaseItems shrinks (e.g. admin un-stars items)
//   const activeSlide = showcaseItems[currentSlide] ?? showcaseItems[0];

//   return (
//     <section className="relative flex flex-col items-center justify-start overflow-hidden bg-[var(--cream)] min-h-screen">

//       {/* Frosting Drip Decoration — top accent */}
//       <svg
//         viewBox="0 0 1440 32"
//         className="absolute top-0 left-0 w-full z-10 pointer-events-none"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//       >
//         <path
//           d="M0,0 L1440,0 L1440,14
//             Q1400,26 1360,14 Q1320,2 1280,18 Q1240,30 1200,18
//             Q1160,6 1120,20 Q1080,32 1040,18 Q1000,6 960,20
//             Q920,32 880,18 Q840,6 800,20 Q760,32 720,18
//             Q680,6 640,20 Q600,32 560,18 Q520,6 480,20
//             Q440,32 400,18 Q360,6 320,20 Q280,32 240,18
//             Q200,6 160,20 Q120,32 80,18 Q40,4 0,16 Z"
//           fill="var(--peach)"
//           fillOpacity="0.12"
//         />
//       </svg>

//       {/* Background Pattern */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 60 60' xmlns='http://w3.org'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23A89080' fill-opacity='0.05' cx='30' cy='30' r='6'/%3E%3Cpath d='M36 34q-4 0-6-3t-2-6q0-4 3-6t6-2q4 0 6 3t2 6q0 4-3 6t-6 2z' fill='%23A89080' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`,
//         }}
//       />

//       {/* Background Image Slider — now driven by admin-starred showcase items */}
//       <div className="absolute inset-0 z-0">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeSlide?.id ?? currentSlide}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.18 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.3 }}
//             className="absolute inset-0 w-full h-full"
//           >
//             <img
//               src={activeSlide?.image ?? FALLBACK_IMAGE}
//               alt=""
//               className="w-full h-full object-cover"
//             />
//           </motion.div>
//         </AnimatePresence>
//         <div className="absolute inset-0 bg-gradient-to-b from-[var(--cream)]/40 via-[var(--cream)]/70 to-[var(--cream)]" />
//         <div className="absolute inset-0 bg-gradient-to-r from-[var(--cream)]/30 via-transparent to-[var(--cream)]/30" />
//       </div>

//       {/* Decorative Orbs — desktop only */}
//       <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[var(--peach)]/10 to-transparent blur-3xl opacity-40 hidden lg:block pointer-events-none" />
//       <div className="absolute bottom-32 left-12 w-64 h-64 rounded-full bg-gradient-to-tr from-[var(--blush)]/10 to-transparent blur-3xl opacity-30 hidden lg:block pointer-events-none" />

//       {/* ── DESKTOP LAYOUT ──────────────────────────────────────────── */}
//       <div className="hidden lg:flex relative z-20 w-full max-w-7xl mx-auto px-8 items-center justify-between pt-36 pb-24 gap-12">
//         <div className="flex-1 max-w-2xl">
//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={0}
//             className="inline-flex items-center gap-3 mb-6"
//           >
//             <div className="w-8 h-0.5 bg-black" />
//             <span className="font-mono text-xs tracking-[3px] uppercase text-black font-medium">
//               ESTABLISHED 2020 · LONDON'S FINEST
//             </span>
//             <div className="w-8 h-0.5 bg-black" />
//           </motion.div>

//           <motion.h1
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={1}
//             className="font-serif text-7xl xl:text-[5.2rem] leading-[1.05] font-medium tracking-tighter mb-8 text-balance"
//             style={{
//               background: 'var(--text-new)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//             }}
//           >
//             Handcrafted with Heart
//           </motion.h1>

//           <motion.p
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={2}
//             className="text-xl xl:text-2xl leading-relaxed text-[var(--text-secondary)] mb-10"
//           >
//             Luxury celebration cakes, bespoke dessert boxes, and artisan baking
//             experiences crafted in London with intention, warmth, and extraordinary
//             attention to detail.
//           </motion.p>

//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={3}
//             className="flex gap-4 mb-10"
//           >
//             <Link
//               to="/shop"
//               className="group inline-flex items-center justify-center gap-3 bg-[var(--peach)] hover:bg-[var(--peach-dark)] transition-all text-white px-10 py-4 rounded-2xl font-medium text-lg shadow-xl shadow-[var(--peach)]/30 active:scale-[0.985]"
//             >
//               <Cake className="w-5 h-5" />
//               Explore Collections
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               to="/cake-classes"
//               className="inline-flex items-center justify-center gap-3 border border-[var(--text-secondary)]/40 hover:border-[var(--peach)] hover:text-[var(--peach)] transition-all px-8 py-4 rounded-2xl font-medium text-lg"
//             >
//               <Sparkles className="w-5 h-5" />
//               Join a Class
//             </Link>
//           </motion.div>

//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={4}
//             className="flex items-center gap-8 text-sm text-[var(--text-secondary)]"
//           >
//             <div className="flex items-center gap-2">
//               <span className="text-2xl">⭐️</span>
//               <span>4.98 · 240+ happy clients</span>
//             </div>
//             <div className="h-4 w-px bg-[var(--text-secondary)]/30" />
//             <div>Featured in Vogue · Time Out · Londonist</div>
//           </motion.div>
//         </div>

//         {/* "This Week's Favourite" showcase card — clickable through to its category */}
//         <motion.div
//           variants={imageFloat}
//           initial="rest"
//           animate="float"
//           className="flex-shrink-0 w-[360px]"
//         >
//           <Link
//             to={activeSlide?.href ?? '/shop'}
//             className="block rounded-3xl overflow-hidden shadow-2xl shadow-black/20 aspect-[4/4.7] relative"
//             style={{
//               background: 'rgba(255,255,255,0.08)',
//               border: '1px solid rgba(168,144,128,0.25)',
//               backdropFilter: 'blur(12px)',
//             }}
//           >
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={activeSlide?.id ?? currentSlide}
//                 src={activeSlide?.image ?? FALLBACK_IMAGE}
//                 alt={activeSlide?.title ?? 'Featured luxury cake'}
//                 initial={{ opacity: 0, scale: 1.08 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.7 }}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//             </AnimatePresence>
//             <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md text-xs font-medium px-5 py-2.5 rounded-2xl shadow flex items-center gap-2 text-[var(--peach)]">
//               <Sparkles className="w-4 h-4" />
//               THIS WEEK'S FAVOURITE
//             </div>
//           </Link>
//         </motion.div>
//       </div>

//       {/* ── MOBILE LAYOUT ────────────────────────────────────────────── */}
//       <div className="lg:hidden relative z-20 w-full flex flex-col items-center pt-16 pb-8 px-5">

//         {/* Eyebrow */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={0}
//           className="inline-flex items-center gap-2 mb-4"
//         >
//           <div className="w-6 h-0.5 bg-black" />
//           <span className="font-mono text-[9px] tracking-[2.5px] uppercase text-black font-medium">
//             ESTABLISHED 2020 · LONDON'S FINEST
//             </span>
//             <div className="w-6 h-0.5 bg-black" />
//         </motion.div>

//         {/* ── Instagram-style Stories Carousel — admin-managed via /admin/featured-items ── */}
//         {allCakes.length > 0 && (
//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={1}
//             className="w-full mb-5"
//           >
//             <div
//               className="
//                 flex gap-4 overflow-x-auto
//                 snap-x snap-mandatory
//                 px-5
//                 [scrollbar-width:none]
//                 [&::-webkit-scrollbar]:hidden
//                 scroll-smooth
//                 touch-pan-x
//               "
//             >
//               {allCakes.map((cake) => (
//                 <Link
//                   key={cake.id}
//                   to={cake.href}
//                   className="
//                     group flex-none flex flex-col items-center gap-2
//                     snap-start
//                   "
//                 >
//                   {/* Peach gradient ring — mimics Instagram story ring */}
//                   <div
//                     className="p-[2.5px] rounded-full"
//                     style={{
//                       background: 'linear-gradient(135deg, var(--peach) 0%, var(--blush, #e8b4a0) 50%, var(--peach-dark, #b87355) 100%)',
//                     }}
//                   >
//                     <div className="p-[2px] rounded-full bg-[var(--cream)]">
//                       <div className="w-[62px] h-[62px] rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
//                         <img
//                           src={cake.image}
//                           alt={cake.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <span className="text-[9px] font-medium text-center text-[var(--text-primary)] opacity-70 group-hover:opacity-100 transition-opacity leading-tight w-[70px]">
//                     {cake.title}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Heading */}
//         <motion.h1
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={2}
//           className="font-serif text-[2.4rem] sm:text-5xl leading-[1.08] font-medium tracking-tighter mb-4 text-center text-balance"
//           style={{
//             background: 'var(--text-new)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//           }}
//         >
//           Handcrafted with Heart
//         </motion.h1>

//         {/* Sub */}
//         <motion.p
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={3}
//           className="text-sm sm:text-base text-center leading-relaxed text-[var(--text-secondary)] mb-6 max-w-xs"
//         >
//           Luxury celebration cakes &amp; bespoke dessert boxes, crafted in London
//           with extraordinary care.
//         </motion.p>

//         {/* CTAs */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={4}
//           className="flex flex-col w-full max-w-[280px] gap-3 mb-6"
//         >
//           <Link
//             to="/shop"
//             className="group inline-flex items-center justify-center gap-2.5 bg-[var(--peach)] hover:bg-[var(--peach-dark)] transition-all text-white px-7 py-3.5 rounded-2xl font-medium text-sm shadow-lg shadow-[var(--peach)]/25 active:scale-[0.985]"
//           >
//             <Cake className="w-4 h-4" />
//             Explore Collections
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </Link>
//           <Link
//             to="/cake-classes"
//             className="inline-flex items-center justify-center gap-2.5 border border-[var(--text-secondary)]/40 hover:border-[var(--peach)] hover:text-[var(--peach)] transition-all px-7 py-3.5 rounded-2xl font-medium text-sm"
//           >
//             <Sparkles className="w-4 h-4" />
//             Join a Class
//           </Link>
//         </motion.div>

//         {/* Trust signals */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={5}
//           className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[11px] text-[var(--text-secondary)] mb-7"
//         >
//           <div className="flex items-center gap-1.5">
//             <span className="text-base">⭐️</span>
//             <span>4.98 · 240+ happy clients</span>
//           </div>
//           <div className="h-3 w-px bg-[var(--text-secondary)]/30" />
//           <div>Vogue · Time Out · Londonist</div>
//         </motion.div>

//         {/* Showcase Card — clickable through to its category, mobile sized */}
//         <motion.div
//           variants={imageFloat}
//           initial="rest"
//           animate="float"
//           className="w-full max-w-[300px] mx-auto"
//         >
//           <Link
//             to={activeSlide?.href ?? '/shop'}
//             className="block rounded-3xl overflow-hidden shadow-xl shadow-black/10 aspect-[4/3.2] relative"
//             style={{
//               background: 'rgba(255,255,255,0.08)',
//               border: '1px solid rgba(168,144,128,0.25)',
//               backdropFilter: 'blur(12px)',
//             }}
//           >
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={activeSlide?.id ?? currentSlide}
//                 src={activeSlide?.image ?? FALLBACK_IMAGE}
//                 alt={activeSlide?.title ?? 'Featured luxury cake'}
//                 initial={{ opacity: 0, scale: 1.08 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.7 }}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//             </AnimatePresence>
//             <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-[9px] font-medium px-3.5 py-1.5 rounded-xl shadow flex items-center gap-1.5 text-[var(--peach)] tracking-wide">
//               <Sparkles className="w-3 h-3" />
//               THIS WEEK'S FAVOURITE
//             </div>
//           </Link>
//         </motion.div>
//       </div>

//       {/* ── Desktop circle row — same admin-managed items, clickable ────────── */}
//       {allCakes.length > 0 && (
//         <div className="hidden lg:block relative z-20 w-full pb-12">
//           <div className="max-w-5xl mx-auto px-8">
//             <div className="flex flex-wrap justify-center gap-8 xl:gap-10">
//               {allCakes.map((cake) => (
//                 <Link
//                   key={cake.id}
//                   to={cake.href}
//                   className="group relative flex flex-col items-center"
//                 >
//                   <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
//                     <img
//                       src={cake.image}
//                       alt={cake.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="mt-3 text-sm font-medium text-center text-[var(--text-primary)] opacity-80 group-hover:opacity-100 transition-opacity px-2">
//                     {cake.title}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Scroll Indicator — desktop only */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[var(--text-secondary)] text-[10px] tracking-widest"
//       >
//         SCROLL TO EXPLORE
//         <div className="w-px h-10 bg-gradient-to-b from-transparent via-current to-transparent" />
//       </motion.div>
//     </section>
//   );
// }

// // C:\Users\Melody\Documents\haliberrycake\frontend\src\components\home\HeroSection.tsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowRight, Sparkles, Cake } from 'lucide-react';
// import { heroTextReveal, imageFloat } from '@/lib/animations';

// export default function HeroSection() {
//   const featuredCakes = [
//     { image: 'cake.avif', title: ' 🎂 Celebration Cakes' },
//     { image: 'cake.webp', title: '💍 Wedding Cakes' },
//     { image: 'cakes.jpg', title: '🧁 Cupcakes' },
//     { image: 'cakess.jpg', title: '🍞 Loaf Cakes' },
//     { image: 'cakess.jpg', title: '🍪 Cookies & Cookie Dippers' },
//   ];

//   const featuredCakes1 = [
//     { image: 'cakeee.jpeg', title: '🍰 Dessert Boxes' },
//     { image: 'cakeeeeee.jpeg', title: '🍩 Sweet Treats' },
//     { image: 'cakeeee.jpeg', title: 'African Treats Collection' },
//     { image: 'cakee.jpeg', title: '🎓 Learn With Haliberry' },
//   ];

//   const sliderImages = [
//     'mmmimage.jpg',
//     ...featuredCakes.map(c => c.image),
//     ...featuredCakes1.map(c => c.image),
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((p) => (p === sliderImages.length - 1 ? 0 : p + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [sliderImages.length]);

//   const allCakes = [...featuredCakes, ...featuredCakes1];

//   return (
//     <section className="relative flex flex-col items-center justify-start overflow-hidden bg-[var(--cream)] min-h-screen">

//       {/* Frosting Drip Decoration — top accent */}
//       <svg
//         viewBox="0 0 1440 32"
//         className="absolute top-0 left-0 w-full z-10 pointer-events-none"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//       >
//         <path
//           d="M0,0 L1440,0 L1440,14
//             Q1400,26 1360,14 Q1320,2 1280,18 Q1240,30 1200,18
//             Q1160,6 1120,20 Q1080,32 1040,18 Q1000,6 960,20
//             Q920,32 880,18 Q840,6 800,20 Q760,32 720,18
//             Q680,6 640,20 Q600,32 560,18 Q520,6 480,20
//             Q440,32 400,18 Q360,6 320,20 Q280,32 240,18
//             Q200,6 160,20 Q120,32 80,18 Q40,4 0,16 Z"
//           fill="var(--peach)"
//           fillOpacity="0.12"
//         />
//       </svg>

//       {/* Background Pattern */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 60 60' xmlns='http://w3.org'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23A89080' fill-opacity='0.05' cx='30' cy='30' r='6'/%3E%3Cpath d='M36 34q-4 0-6-3t-2-6q0-4 3-6t6-2q4 0 6 3t2 6q0 4-3 6t-6 2z' fill='%23A89080' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`,
//         }}
//       />

//       {/* Background Image Slider */}
//       <div className="absolute inset-0 z-0">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.18 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.3 }}
//             className="absolute inset-0 w-full h-full"
//           >
//             <img
//               src={sliderImages[currentSlide]}
//               alt=""
//               className="w-full h-full object-cover"
//             />
//           </motion.div>
//         </AnimatePresence>
//         <div className="absolute inset-0 bg-gradient-to-b from-[var(--cream)]/40 via-[var(--cream)]/70 to-[var(--cream)]" />
//         <div className="absolute inset-0 bg-gradient-to-r from-[var(--cream)]/30 via-transparent to-[var(--cream)]/30" />
//       </div>

//       {/* Decorative Orbs — desktop only */}
//       <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[var(--peach)]/10 to-transparent blur-3xl opacity-40 hidden lg:block pointer-events-none" />
//       <div className="absolute bottom-32 left-12 w-64 h-64 rounded-full bg-gradient-to-tr from-[var(--blush)]/10 to-transparent blur-3xl opacity-30 hidden lg:block pointer-events-none" />

//       {/* ── DESKTOP LAYOUT ──────────────────────────────────────────── */}
//       <div className="hidden lg:flex relative z-20 w-full max-w-7xl mx-auto px-8 items-center justify-between pt-36 pb-24 gap-12">
//         <div className="flex-1 max-w-2xl">
//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={0}
//             className="inline-flex items-center gap-3 mb-6"
//           >
//             <div className="w-8 h-0.5 bg-black" />
//             <span className="font-mono text-xs tracking-[3px] uppercase text-black font-medium">
//               ESTABLISHED 2020 · LONDON'S FINEST
//             </span>
//             <div className="w-8 h-0.5 bg-black" />
//           </motion.div>

//           <motion.h1
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={1}
//             className="font-serif text-7xl xl:text-[5.2rem] leading-[1.05] font-medium tracking-tighter mb-8 text-balance"
//             style={{
//               background: 'var(--text-new)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//             }}
//           >
//             Handcrafted with Heart
//           </motion.h1>

//           <motion.p
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={2}
//             className="text-xl xl:text-2xl leading-relaxed text-[var(--text-secondary)] mb-10"
//           >
//             Luxury celebration cakes, bespoke dessert boxes, and artisan baking
//             experiences crafted in London with intention, warmth, and extraordinary
//             attention to detail.
//           </motion.p>

//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={3}
//             className="flex gap-4 mb-10"
//           >
//             <Link
//               to="/shop"
//               className="group inline-flex items-center justify-center gap-3 bg-[var(--peach)] hover:bg-[var(--peach-dark)] transition-all text-white px-10 py-4 rounded-2xl font-medium text-lg shadow-xl shadow-[var(--peach)]/30 active:scale-[0.985]"
//             >
//               <Cake className="w-5 h-5" />
//               Explore Collections
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               to="/cake-classes"
//               className="inline-flex items-center justify-center gap-3 border border-[var(--text-secondary)]/40 hover:border-[var(--peach)] hover:text-[var(--peach)] transition-all px-8 py-4 rounded-2xl font-medium text-lg"
//             >
//               <Sparkles className="w-5 h-5" />
//               Join a Class
//             </Link>
//           </motion.div>

//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={4}
//             className="flex items-center gap-8 text-sm text-[var(--text-secondary)]"
//           >
//             <div className="flex items-center gap-2">
//               <span className="text-2xl">⭐️</span>
//               <span>4.98 · 240+ happy clients</span>
//             </div>
//             <div className="h-4 w-px bg-[var(--text-secondary)]/30" />
//             <div>Featured in Vogue · Time Out · Londonist</div>
//           </motion.div>
//         </div>

//         <motion.div
//           variants={imageFloat}
//           initial="rest"
//           animate="float"
//           className="flex-shrink-0 w-[360px]"
//         >
//           <div
//             className="rounded-3xl overflow-hidden shadow-2xl shadow-black/20 aspect-[4/4.7] relative"
//             style={{
//               background: 'rgba(255,255,255,0.08)',
//               border: '1px solid rgba(168,144,128,0.25)',
//               backdropFilter: 'blur(12px)',
//             }}
//           >
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={currentSlide}
//                 src={sliderImages[currentSlide]}
//                 alt="Featured luxury cake"
//                 initial={{ opacity: 0, scale: 1.08 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.7 }}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//             </AnimatePresence>
//             <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md text-xs font-medium px-5 py-2.5 rounded-2xl shadow flex items-center gap-2 text-[var(--peach)]">
//               <Sparkles className="w-4 h-4" />
//               THIS WEEK'S FAVOURITE
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ── MOBILE LAYOUT ────────────────────────────────────────────── */}
//       <div className="lg:hidden relative z-20 w-full flex flex-col items-center pt-16 pb-8 px-5">

//         {/* Eyebrow */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={0}
//           className="inline-flex items-center gap-2 mb-4"
//         >
//           <div className="w-6 h-0.5 bg-black" />
//           <span className="font-mono text-[9px] tracking-[2.5px] uppercase text-black font-medium">
//             ESTABLISHED 2020 · LONDON'S FINEST
//             </span>
//             <div className="w-6 h-0.5 bg-black" />
//         </motion.div>

//         {/* ── Instagram-style Stories Carousel ── */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={1}
//           className="w-full mb-5"
//         >
//           {/*
//             Horizontal scroll container.
//             • overflow-x: auto with snap scrolling
//             • scrollbar hidden via [&::-webkit-scrollbar]:hidden + [scrollbar-width:none]
//             • px-5 gives breathing room so first/last items don't clip flush to the edge
//           */}
//           <div
//             className="
//               flex gap-4 overflow-x-auto
//               snap-x snap-mandatory
//               px-5
//               [scrollbar-width:none]
//               [&::-webkit-scrollbar]:hidden
//               scroll-smooth
//               touch-pan-x
//             "
//           >
//             {allCakes.map((cake, index) => (
//               <Link
//                 key={index}
//                 to="/shop"
//                 className="
//                   group flex-none flex flex-col items-center gap-2
//                   snap-start
//                 "
//               >
//                 {/* Peach gradient ring — mimics Instagram story ring */}
//                 <div
//                   className="p-[2.5px] rounded-full"
//                   style={{
//                     background: 'linear-gradient(135deg, var(--peach) 0%, var(--blush, #e8b4a0) 50%, var(--peach-dark, #b87355) 100%)',
//                   }}
//                 >
//                   <div className="p-[2px] rounded-full bg-[var(--cream)]">
//                     <div className="w-[62px] h-[62px] rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
//                       <img
//                         src={cake.image}
//                         alt={cake.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <span className="text-[9px] font-medium text-center text-[var(--text-primary)] opacity-70 group-hover:opacity-100 transition-opacity leading-tight w-[70px]">
//                   {cake.title}
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </motion.div>

//         {/* Heading */}
//         <motion.h1
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={2}
//           className="font-serif text-[2.4rem] sm:text-5xl leading-[1.08] font-medium tracking-tighter mb-4 text-center text-balance"
//           style={{
//             background: 'var(--text-new)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//           }}
//         >
//           Handcrafted with Heart
//         </motion.h1>

//         {/* Sub */}
//         <motion.p
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={3}
//           className="text-sm sm:text-base text-center leading-relaxed text-[var(--text-secondary)] mb-6 max-w-xs"
//         >
//           Luxury celebration cakes &amp; bespoke dessert boxes, crafted in London
//           with extraordinary care.
//         </motion.p>

//         {/* CTAs */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={4}
//           className="flex flex-col w-full max-w-[280px] gap-3 mb-6"
//         >
//           <Link
//             to="/shop"
//             className="group inline-flex items-center justify-center gap-2.5 bg-[var(--peach)] hover:bg-[var(--peach-dark)] transition-all text-white px-7 py-3.5 rounded-2xl font-medium text-sm shadow-lg shadow-[var(--peach)]/25 active:scale-[0.985]"
//           >
//             <Cake className="w-4 h-4" />
//             Explore Collections
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </Link>
//           <Link
//             to="/cake-classes"
//             className="inline-flex items-center justify-center gap-2.5 border border-[var(--text-secondary)]/40 hover:border-[var(--peach)] hover:text-[var(--peach)] transition-all px-7 py-3.5 rounded-2xl font-medium text-sm"
//           >
//             <Sparkles className="w-4 h-4" />
//             Join a Class
//           </Link>
//         </motion.div>

//         {/* Trust signals */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={5}
//           className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[11px] text-[var(--text-secondary)] mb-7"
//         >
//           <div className="flex items-center gap-1.5">
//             <span className="text-base">⭐️</span>
//             <span>4.98 · 240+ happy clients</span>
//           </div>
//           <div className="h-3 w-px bg-[var(--text-secondary)]/30" />
//           <div>Vogue · Time Out · Londonist</div>
//         </motion.div>

//         {/* Showcase Card */}
//         <motion.div
//           variants={imageFloat}
//           initial="rest"
//           animate="float"
//           className="w-full max-w-[300px] mx-auto"
//         >
//           <div
//             className="rounded-3xl overflow-hidden shadow-xl shadow-black/10 aspect-[4/3.2] relative"
//             style={{
//               background: 'rgba(255,255,255,0.08)',
//               border: '1px solid rgba(168,144,128,0.25)',
//               backdropFilter: 'blur(12px)',
//             }}
//           >
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={currentSlide}
//                 src={sliderImages[currentSlide]}
//                 alt="Featured luxury cake"
//                 initial={{ opacity: 0, scale: 1.08 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.7 }}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//             </AnimatePresence>
//             <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-[9px] font-medium px-3.5 py-1.5 rounded-xl shadow flex items-center gap-1.5 text-[var(--peach)] tracking-wide">
//               <Sparkles className="w-3 h-3" />
//               THIS WEEK'S FAVOURITE
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ── Desktop circle row ────────────────────────────────── */}
//       <div className="hidden lg:block relative z-20 w-full pb-12">
//         <div className="max-w-5xl mx-auto px-8">
//           <div className="flex flex-wrap justify-center gap-8 xl:gap-10">
//             {allCakes.map((cake, index) => (
//               <Link
//                 key={index}
//                 to="/shop"
//                 className="group relative flex flex-col items-center"
//               >
//                 <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
//                   <img
//                     src={cake.image}
//                     alt={cake.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="mt-3 text-sm font-medium text-center text-[var(--text-primary)] opacity-80 group-hover:opacity-100 transition-opacity px-2">
//                   {cake.title}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator — desktop only */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[var(--text-secondary)] text-[10px] tracking-widest"
//       >
//         SCROLL TO EXPLORE
//         <div className="w-px h-10 bg-gradient-to-b from-transparent via-current to-transparent" />
//       </motion.div>
//     </section>
//   );
// }


// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\home\HeroSection.tsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowRight, Sparkles, Cake } from 'lucide-react';
// import { heroTextReveal, imageFloat } from '@/lib/animations';

// export default function HeroSection() {
//   const featuredCakes = [
//     { image: 'cake.avif', title: 'Wedding Cakes' },
//     { image: 'cake.webp', title: 'Birthday Cakes' },
//     { image: 'cakes.jpg', title: 'Cupcakes' },
//     { image: 'cakess.jpg', title: 'Custom Orders' },
//   ];

//   const featuredCakes1 = [
//     { image: 'cakeee.jpeg', title: 'Wedding Cakes' },
//     { image: 'cakeeeeee.jpeg', title: 'Birthday Cakes' },
//     { image: 'cakeeee.jpeg', title: 'Cupcakes' },
//     { image: 'cakee.jpeg', title: 'Custom Orders' },
//   ];

//   const sliderImages = [
//     'mmmimage.jpg',
//     ...featuredCakes.map(c => c.image),
//     ...featuredCakes1.map(c => c.image),
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((p) => (p === sliderImages.length - 1 ? 0 : p + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [sliderImages.length]);

//   // On mobile we only show one set of 4 circles to avoid overflow
//   const mobileCakes = featuredCakes;
//   const allCakes = [...featuredCakes, ...featuredCakes1];

//   return (
//     <section className="relative flex flex-col items-center justify-start overflow-hidden bg-[var(--cream)] min-h-screen">

//       {/* Frosting Drip Decoration — top accent */}
//       <svg
//         viewBox="0 0 1440 32"
//         className="absolute top-0 left-0 w-full z-10 pointer-events-none"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//       >
//         <path
//           d="M0,0 L1440,0 L1440,14
//             Q1400,26 1360,14 Q1320,2 1280,18 Q1240,30 1200,18
//             Q1160,6 1120,20 Q1080,32 1040,18 Q1000,6 960,20
//             Q920,32 880,18 Q840,6 800,20 Q760,32 720,18
//             Q680,6 640,20 Q600,32 560,18 Q520,6 480,20
//             Q440,32 400,18 Q360,6 320,20 Q280,32 240,18
//             Q200,6 160,20 Q120,32 80,18 Q40,4 0,16 Z"
//           fill="var(--peach)"
//           fillOpacity="0.12"
//         />
//       </svg>

//       {/* Background Pattern */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 60 60' xmlns='http://w3.org'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23A89080' fill-opacity='0.05' cx='30' cy='30' r='6'/%3E%3Cpath d='M36 34q-4 0-6-3t-2-6q0-4 3-6t6-2q4 0 6 3t2 6q0 4-3 6t-6 2z' fill='%23A89080' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`,
//         }}
//       />

//       {/* Background Image Slider */}
//       <div className="absolute inset-0 z-0">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.18 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.3 }}
//             className="absolute inset-0 w-full h-full"
//           >
//             <img
//               src={sliderImages[currentSlide]}
//               alt=""
//               className="w-full h-full object-cover"
//             />
//           </motion.div>
//         </AnimatePresence>
//         <div className="absolute inset-0 bg-gradient-to-b from-[var(--cream)]/40 via-[var(--cream)]/70 to-[var(--cream)]" />
//         <div className="absolute inset-0 bg-gradient-to-r from-[var(--cream)]/30 via-transparent to-[var(--cream)]/30" />
//       </div>

//       {/* Decorative Orbs — desktop only */}
//       <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[var(--peach)]/10 to-transparent blur-3xl opacity-40 hidden lg:block pointer-events-none" />
//       <div className="absolute bottom-32 left-12 w-64 h-64 rounded-full bg-gradient-to-tr from-[var(--blush)]/10 to-transparent blur-3xl opacity-30 hidden lg:block pointer-events-none" />

//       {/* ── DESKTOP LAYOUT ──────────────────────────────────────────── */}
//       <div className="hidden lg:flex relative z-20 w-full max-w-7xl mx-auto px-8 items-center justify-between pt-36 pb-24 gap-12">

//         {/* Left: Text + CTAs */}
//         <div className="flex-1 max-w-2xl">
//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={0}
//             className="inline-flex items-center gap-3 mb-6"
//           >
//             <div className="w-8 h-px bg-gradient-to-r from-transparent via-[var(--peach)] to-[var(--peach)]" />
//             <span className="font-mono text-xs tracking-[3px] uppercase text-[var(--peach)] font-medium">
//               ESTABLISHED 2020 · LONDON'S FINEST
//             </span>
//             <div className="w-8 h-px bg-gradient-to-r from-[var(--peach)] to-transparent" />
//           </motion.div>

//           <motion.h1
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={1}
//             className="font-serif text-7xl xl:text-[5.2rem] leading-[1.05] font-medium tracking-tighter mb-8 text-balance"
//             style={{
//               background: 'var(--text-new)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//             }}
//           >
//             Handcrafted with Heart
//           </motion.h1>

//           <motion.p
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={2}
//             className="text-xl xl:text-2xl leading-relaxed text-[var(--text-secondary)] mb-10"
//           >
//             Luxury celebration cakes, bespoke dessert boxes, and artisan baking
//             experiences crafted in London with intention, warmth, and extraordinary
//             attention to detail.
//           </motion.p>

//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={3}
//             className="flex gap-4 mb-10"
//           >
//             <Link
//               to="/shop"
//               className="group inline-flex items-center justify-center gap-3 bg-[var(--peach)] hover:bg-[var(--peach-dark)] transition-all text-white px-10 py-4 rounded-2xl font-medium text-lg shadow-xl shadow-[var(--peach)]/30 active:scale-[0.985]"
//             >
//               <Cake className="w-5 h-5" />
//               Explore Collections
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               to="/cake-classes"
//               className="inline-flex items-center justify-center gap-3 border border-[var(--text-secondary)]/40 hover:border-[var(--peach)] hover:text-[var(--peach)] transition-all px-8 py-4 rounded-2xl font-medium text-lg"
//             >
//               <Sparkles className="w-5 h-5" />
//               Join a Class
//             </Link>
//           </motion.div>

//           <motion.div
//             initial="hidden" animate="visible"
//             variants={heroTextReveal} custom={4}
//             className="flex items-center gap-8 text-sm text-[var(--text-secondary)]"
//           >
//             <div className="flex items-center gap-2">
//               <span className="text-2xl">⭐️</span>
//               <span>4.98 · 240+ happy clients</span>
//             </div>
//             <div className="h-4 w-px bg-[var(--text-secondary)]/30" />
//             <div>Featured in Vogue · Time Out · Londonist</div>
//           </motion.div>
//         </div>

//         {/* Right: Floating Showcase Card */}
//         <motion.div
//           variants={imageFloat}
//           initial="rest"
//           animate="float"
//           className="flex-shrink-0 w-[360px]"
//         >
//           <div
//             className="rounded-3xl overflow-hidden shadow-2xl shadow-black/20 aspect-[4/4.7] relative"
//             style={{
//               background: 'rgba(255,255,255,0.08)',
//               border: '1px solid rgba(168,144,128,0.25)',
//               backdropFilter: 'blur(12px)',
//             }}
//           >
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={currentSlide}
//                 src={sliderImages[currentSlide]}
//                 alt="Featured luxury cake"
//                 initial={{ opacity: 0, scale: 1.08 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.7 }}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//             </AnimatePresence>
//             <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md text-xs font-medium px-5 py-2.5 rounded-2xl shadow flex items-center gap-2 text-[var(--peach)]">
//               <Sparkles className="w-4 h-4" />
//               THIS WEEK'S FAVOURITE
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ── MOBILE LAYOUT ────────────────────────────────────────────── */}
//       <div className="lg:hidden relative z-20 w-full flex flex-col items-center pt-24 pb-10 px-5">

//         {/* Eyebrow */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={0}
//           className="inline-flex items-center gap-2 mb-5"
//         >
//           <div className="w-6 h-px bg-[var(--peach)]" />
//           <span className="font-mono text-[9px] tracking-[2.5px] uppercase text-[var(--peach)] font-medium">
//             ESTABLISHED 2020 · LONDON'S FINEST
//           </span>
//           <div className="w-6 h-px bg-[var(--peach)]" />
//         </motion.div>

//         {/* Heading */}
//         <motion.h1
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={1}
//           className="font-serif text-[2.6rem] sm:text-5xl leading-[1.08] font-medium tracking-tighter mb-5 text-center text-balance"
//           style={{
//             background: 'var(--text-new)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//           }}
//         >
//           Handcrafted with Heart
//         </motion.h1>

//         {/* Sub */}
//         <motion.p
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={2}
//           className="text-base sm:text-lg text-center leading-relaxed text-[var(--text-secondary)] mb-7 max-w-sm"
//         >
//           Luxury celebration cakes, bespoke dessert boxes, and artisan baking
//           experiences crafted in London.
//         </motion.p>

//         {/* CTAs — stacked on mobile */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={3}
//           className="flex flex-col w-full max-w-xs gap-3 mb-7"
//         >
//           <Link
//             to="/shop"
//             className="group inline-flex items-center justify-center gap-3 bg-[var(--peach)] hover:bg-[var(--peach-dark)] transition-all text-white px-8 py-4 rounded-2xl font-medium text-base shadow-lg shadow-[var(--peach)]/25 active:scale-[0.985]"
//           >
//             <Cake className="w-5 h-5" />
//             Explore Collections
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </Link>
//           <Link
//             to="/cake-classes"
//             className="inline-flex items-center justify-center gap-3 border border-[var(--text-secondary)]/40 hover:border-[var(--peach)] hover:text-[var(--peach)] transition-all px-8 py-4 rounded-2xl font-medium text-base"
//           >
//             <Sparkles className="w-5 h-5" />
//             Join a Class
//           </Link>
//         </motion.div>

//         {/* Trust signals */}
//         <motion.div
//           initial="hidden" animate="visible"
//           variants={heroTextReveal} custom={4}
//           className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs text-[var(--text-secondary)] mb-8"
//         >
//           <div className="flex items-center gap-1.5">
//             <span className="text-lg">⭐️</span>
//             <span>4.98 · 240+ happy clients</span>
//           </div>
//           <div className="h-3 w-px bg-[var(--text-secondary)]/30" />
//           <div>Vogue · Time Out · Londonist</div>
//         </motion.div>

//         {/* Showcase Card — full-width on mobile */}
//         <motion.div
//           variants={imageFloat}
//           initial="rest"
//           animate="float"
//           className="w-full max-w-xs mx-auto mb-10"
//         >
//           <div
//             className="rounded-3xl overflow-hidden shadow-xl shadow-black/15 aspect-[4/3.6] relative"
//             style={{
//               background: 'rgba(255,255,255,0.08)',
//               border: '1px solid rgba(168,144,128,0.25)',
//               backdropFilter: 'blur(12px)',
//             }}
//           >
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={currentSlide}
//                 src={sliderImages[currentSlide]}
//                 alt="Featured luxury cake"
//                 initial={{ opacity: 0, scale: 1.08 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.7 }}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//             </AnimatePresence>
//             <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[10px] font-medium px-4 py-2 rounded-xl shadow flex items-center gap-1.5 text-[var(--peach)]">
//               <Sparkles className="w-3 h-3" />
//               THIS WEEK'S FAVOURITE
//             </div>
//           </div>
//         </motion.div>

//         {/* Circle Grid — 4 columns on mobile, clean & balanced */}
//         <div className="w-full max-w-sm mx-auto">
//           <div className="grid grid-cols-4 gap-3">
//             {mobileCakes.map((cake, index) => (
//               <Link
//                 key={index}
//                 to="/shop"
//                 className="group flex flex-col items-center gap-2"
//               >
//                 <div className="w-16 h-16 rounded-full overflow-hidden border-[3px] border-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
//                   <img
//                     src={cake.image}
//                     alt={cake.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <span className="text-[10px] font-medium text-center text-[var(--text-primary)] opacity-75 group-hover:opacity-100 transition-opacity leading-tight px-0.5">
//                   {cake.title}
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── SHARED: Desktop circle row ────────────────────────────────── */}
//       <div className="hidden lg:block relative z-20 w-full pb-12">
//         <div className="max-w-5xl mx-auto px-8">
//           <div className="flex flex-wrap justify-center gap-8 xl:gap-10">
//             {allCakes.map((cake, index) => (
//               <Link
//                 key={index}
//                 to="/shop"
//                 className="group relative flex flex-col items-center"
//               >
//                 <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
//                   <img
//                     src={cake.image}
//                     alt={cake.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="mt-3 text-sm font-medium text-center text-[var(--text-primary)] opacity-80 group-hover:opacity-100 transition-opacity px-2">
//                   {cake.title}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator — desktop only */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[var(--text-secondary)] text-[10px] tracking-widest"
//       >
//         SCROLL TO EXPLORE
//         <div className="w-px h-10 bg-gradient-to-b from-transparent via-current to-transparent" />
//       </motion.div>
//     </section>
//   );
// }

// // C:\Users\Melody\Documents\haliberrycake\frontend\src\components\home\HeroSection.tsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowRight, Sparkles, Cake } from 'lucide-react';
// import { heroTextReveal, imageFloat } from '@/lib/animations';

// export default function HeroSection() {
//   const featuredCakes = [
//     { image: 'cake.avif', title: 'Wedding Cakes' },
//     { image: 'cake.webp', title: 'Birthday Cakes' },
//     { image: 'cakes.jpg', title: 'Cupcakes' },
//     { image: 'cakess.jpg', title: 'Custom Orders' },
//   ];

//   const featuredCakes1 = [
//     { image: 'cakeee.jpeg', title: 'Wedding Cakes' },
//     { image: 'cakeeeeee.jpeg', title: 'Birthday Cakes' },
//     { image: 'cakeeee.jpeg', title: 'Cupcakes' },
//     { image: 'cakee.jpeg', title: 'Custom Orders' },
//   ];

//   const sliderImages = [
//     'mmmimage.jpg',
//     ...featuredCakes.map(c => c.image),
//     ...featuredCakes1.map(c => c.image),
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((p) => (p === sliderImages.length - 1 ? 0 : p + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [sliderImages.length]);

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--cream)]">
//       {/* Background Pattern */}
//       <div 
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 60 60' xmlns='http://w3.org'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23A89080' fill-opacity='0.05' cx='30' cy='30' r='6'/%3E%3Cpath d='M36 34q-4 0-6-3t-2-6q0-4 3-6t6-2q4 0 6 3t2 6q0 4-3 6t-6 2z' fill='%23A89080' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`,
//         }}
//       />

//       {/* Background Image Slider */}
//       <div className="absolute inset-0 z-0">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.18 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.3 }}
//             className="absolute inset-0 w-full h-full"
//           >
//             <img
//               src={sliderImages[currentSlide]}
//               alt=""
//               className="w-full h-full object-cover"
//             />
//           </motion.div>
//         </AnimatePresence>

//         <div className="absolute inset-0 bg-gradient-to-b from-[var(--cream)]/40 via-[var(--cream)]/70 to-[var(--cream)]" />
//         <div className="absolute inset-0 bg-gradient-to-r from-[var(--cream)]/30 via-transparent to-[var(--cream)]/30" />
//       </div>

//       {/* Decorative Orbs */}
//       <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[var(--peach)]/10 to-transparent blur-3xl opacity-40 hidden lg:block pointer-events-none" />
//       <div className="absolute bottom-32 left-12 w-64 h-64 rounded-full bg-gradient-to-tr from-[var(--blush)]/10 to-transparent blur-3xl opacity-30 hidden lg:block pointer-events-none" />

//       {/* Main Centered Content */}
//       <div className="relative z-20 max-w-4xl mx-auto px-6 sm:px-8 text-center pt-12 pb-20">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={heroTextReveal}
//           custom={0}
//           className="inline-flex items-center gap-3 mb-6 mx-auto"
//         >
//           <div className="w-8 h-px bg-gradient-to-r from-transparent via-[var(--peach)] to-[var(--peach)]" />
//           <span className="font-mono text-xs tracking-[3px] uppercase text-[var(--peach)] font-medium">
//             ESTABLISHED 2020 • LONDON'S FINEST
//           </span>
//           <div className="w-8 h-px bg-gradient-to-r from-[var(--peach)] to-transparent" />
//         </motion.div>

//         <motion.h1
//           initial="hidden"
//           animate="visible"
//           variants={heroTextReveal}
//           custom={1}
//           className="font-serif text-6xl sm:text-7xl lg:text-[5.2rem] leading-[1.05] font-medium tracking-tighter mb-8 text-balance"
//           style={{
//             background: 'var(--text-new)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text'
//           }}
//         >
//           Handcrafted with Heart
//         </motion.h1>

//         <motion.p
//           initial="hidden"
//           animate="visible"
//           variants={heroTextReveal}
//           custom={2}
//           className="text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed text-[var(--text-secondary)] mb-12"
//         >
//           Luxury celebration cakes, bespoke dessert boxes, and artisan baking experiences 
//           crafted in London with intention, warmth, and extraordinary attention to detail.
//         </motion.p>

//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={heroTextReveal}
//           custom={3}
//           className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
//         >
//           <Link 
//             to="/shop" 
//             className="group inline-flex items-center justify-center gap-3 bg-[var(--peach)] hover:bg-[var(--peach-dark)] transition-all text-white px-10 py-4 rounded-2xl font-medium text-lg shadow-xl shadow-[var(--peach)]/30 active:scale-[0.985]"
//           >
//             <Cake className="w-5 h-5" />
//             Explore Collections
//             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//           </Link>

//           <Link 
//             to="/cake-classes" 
//             className="inline-flex items-center justify-center gap-3 border border-[var(--text-secondary)]/40 hover:border-[var(--peach)] hover:text-[var(--peach)] transition-all px-8 py-4 rounded-2xl font-medium text-lg"
//           >
//             <Sparkles className="w-5 h-5" />
//             Join a Class
//           </Link>
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={heroTextReveal}
//           custom={4}
//           className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm text-[var(--text-secondary)]"
//         >
//           <div className="flex items-center gap-2">
//             <span className="text-2xl">⭐️</span>
//             <span>4.98 • 240+ happy clients</span>
//           </div>
//           <div className="h-4 w-px bg-[var(--text-secondary)]/30 hidden sm:block" />
//           <div>Featured in Vogue • Time Out • Londonist</div>
//         </motion.div>
//       </div>

//       {/* Floating Showcase Card */}
//       <motion.div
//         variants={imageFloat}
//         initial="rest"
//         animate="float"
//         className="relative z-30 mx-auto max-w-[340px] lg:absolute lg:right-12 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-[360px] mt-8 lg:mt-0"
//       >
//         <div 
//           className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30 aspect-[4/4.7] relative"
//           style={{
//             background: 'rgba(255,255,255,0.08)',
//             border: '1px solid rgba(168,144,128,0.25)',
//             backdropFilter: 'blur(12px)',
//           }}
//         >
//           <AnimatePresence mode="wait">
//             <motion.img
//               key={currentSlide}
//               src={sliderImages[currentSlide]}
//               alt="Featured luxury cake"
//               initial={{ opacity: 0, scale: 1.08 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.7 }}
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//           </AnimatePresence>

//           <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-xs font-medium px-5 py-2.5 rounded-2xl shadow flex items-center gap-2 text-[var(--peach)]">
//             <Sparkles className="w-4 h-4" />
//             THIS WEEK’S FAVOURITE
//           </div>
//         </div>
//       </motion.div>

//       {/* Featured Cake Circles - Centered on Mobile */}
//       <div className="relative z-20 w-full mt-16 lg:mt-8">
//         <div className="max-w-5xl mx-auto px-6">
//           <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
//             {[...featuredCakes, ...featuredCakes1].map((cake, index) => (
//               <Link
//                 key={index}
//                 to="/shop"
//                 className="group relative flex flex-col items-center"
//               >
//                 <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
//                   <img
//                     src={cake.image}
//                     alt={cake.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="mt-4 text-sm font-medium text-center text-[var(--text-primary)] opacity-80 group-hover:opacity-100 transition-opacity px-2">
//                   {cake.title}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-secondary)] text-xs tracking-widest hidden lg:flex"
//       >
//         SCROLL TO EXPLORE
//         <div className="w-px h-10 bg-gradient-to-b from-transparent via-current to-transparent" />
//       </motion.div>
//     </section>
//   );
// }