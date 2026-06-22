// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\shop\ProductCard.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, Star, ArrowRight } from 'lucide-react'
import type { Product } from '@/types'
import { fadeUp } from '@/lib/animations'

const CATEGORY_COLOURS: Record<string, string> = {
  celebration:  'var(--cream)',
  wedding: 'var(--cream)',
  cupcakes: 'var(--cream)',
  loaf : 'var(--cream)',
  cookies:   'var(--cream)',
  desserts: 'var(--cream)',   // was dessert_boxes
  treats:   'var(--cream)',   // was luxury_treats
  african: 'var(--cream)',
  learning: 'var(--cream)',
}

const CATEGORY_EMOJI: Record<string, string> = {
  celebration:  '🎁',
  wedding: '💍',
  cupcakes: '🧁',
  loaf: '🍞',
  cookies:   '🍪',
  desserts: '🎁',
  treats:   '✨',
  african: '🌍',
  learning: '🎓',
}

const CATEGORY_LABELS: Record<string, string> = {
  celebration:  'Celebration Cake',
  wedding:  'Wedding Cake',
  birthday: 'Birthday Cake',
  cupcakes: 'Cupcakes',
  loaf: 'Loaf Cake',
  cookies: 'Cookies & Cookie Dippers',
  desserts: 'Dessert Box',
  treats:   'Luxury Treats',
  african: 'African Treats',
  learning: 'Learn With Haliberry',
}

interface Props {
  product: Product
  onInquire: (p: Product) => void
}

export default function ProductCard({ product, onInquire }: Props) {
  const bg    = CATEGORY_COLOURS[product.category] ?? 'var(--cream)'
  const emoji = CATEGORY_EMOJI[product.category]   ?? '🎂'

  return (
    <motion.div
      variants={fadeUp}
      className="group card-luxury flex flex-col overflow-hidden"
    >
      {/* ── Image ──────────────────────────────────────────────────── */}
      {/*
        aspect-[3/2.6] on mobile: slightly taller than wide — shows more cake.
        aspect-[4/3]   on desktop: classic editorial proportion.
        No excess height that creates blank space when placeholder is shown.
      */}
      <div
        className="relative aspect-[3/2.6] sm:aspect-[4/3] overflow-hidden rounded-t-[1.25rem]"
        style={{ background: bg }}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Placeholder: centred emoji in a subtle gradient — not a vast empty slab */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, var(--cream) 0%, #f5ebe0 100%)',
            }}
          >
            <span className="text-4xl select-none" aria-hidden>{emoji}</span>
          </div>
        )}

        {/* Featured badge */}
        {product.featured && (
          <div
            className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-lg font-sans text-[10px] font-semibold tracking-wide"
            style={{ background: 'var(--peach)', color: 'white' }}
          >
            <Star size={10} fill="white" strokeWidth={0} />
            Featured
          </div>
        )}

        {/* Hover overlay with quick-enquire — desktop only (touch users tap the button below) */}
        <div
          className="
            absolute inset-0 hidden sm:flex items-end justify-center pb-4
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }}
        >
          <button
            onClick={() => onInquire(product)}
            className="btn-ghost text-xs py-2 px-5"
          >
            <MessageCircle size={13} />
            Enquire Now
          </button>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      {/*
        Reduced padding: p-4 mobile / p-5 desktop.
        Tighter space-y so cards feel dense and editorial, not airy and unfinished.
      */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category label */}
        <p
          className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase mb-1"
          style={{ color: 'var(--peach)' }}
        >
          {CATEGORY_LABELS[product.category] ?? product.category}
        </p>

        {/* Product name */}
        <h3
          className="font-serif font-semibold mb-1.5 leading-snug"
          style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}
        >
          {product.name}
        </h3>

        {/* Description — clamped to 2 lines to keep cards uniform height */}
        <p
          className="font-sans text-xs leading-relaxed flex-1 line-clamp-2 mb-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          {product.description}
        </p>

        {/* Price + CTA */}
        <div
          className="flex flex-col gap-3 pt-3"
          style={{ borderTop: '1px solid var(--cream)' }}
        >
          <div className="flex items-center justify-between">
            <span
              className="font-serif font-semibold"
              style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}
            >
              {product.price > 0 ? `from £${product.price.toFixed(0)}` : 'POA'}
            </span>
            <Link
              to={`/product/${product.id}`}
              className="inline-flex items-center gap-2 btn-outline py-2 px-4 text-xs"
            >
              View details
              <ArrowRight size={12} />
            </Link>
          </div>

          <button
            onClick={() => onInquire(product)}
            className="btn-primary py-2 px-4 text-xs"
          >
            Enquire
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// // C:\Users\Melody\Documents\haliberrycake\frontend\src\components\shop\ProductCard.tsx
// import { motion } from 'framer-motion'
// import { MessageCircle, Star } from 'lucide-react'
// import type { Product } from '@/types'
// import { fadeUp } from '@/lib/animations'

// const CATEGORY_COLOURS: Record<string, string> = {
//   wedding:  'var(--cream)',
//   birthday: 'var(--cream)',
//   cupcakes: 'var(--cream)',
//   desserts: 'var(--cream)',   // was dessert_boxes
//   treats:   'var(--cream)',   // was luxury_treats
// }

// const CATEGORY_EMOJI: Record<string, string> = {
//   wedding:  '💍',
//   birthday: '🎂',
//   cupcakes: '🧁',
//   desserts: '🎁',   // was dessert_boxes
//   treats:   '✨',   // was luxury_treats
// }

// const CATEGORY_LABELS: Record<string, string> = {
//   wedding:  'Wedding Cake',
//   birthday: 'Birthday Cake',
//   cupcakes: 'Cupcakes',
//   desserts: 'Dessert Box',
//   treats:   'Luxury Treats',
// }

// interface Props {
//   product: Product
//   onInquire: (p: Product) => void
// }

// export default function ProductCard({ product, onInquire }: Props) {
//   const bg = CATEGORY_COLOURS[product.category] ?? 'var(--cream)'
//   const emoji = CATEGORY_EMOJI[product.category] ?? '🎂'

//   return (
//     <motion.div
//       variants={fadeUp}
//       className="group card-luxury flex flex-col"
//     >
//       {/* Image / Placeholder */}
//       <div className="relative aspect-[4/3] overflow-hidden rounded-t-[1.25rem]"
//         style={{ background: bg }}>
//         {product.image_url ? (
//           <img
//             src={product.image_url}
//             alt={product.name}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <span className="text-5xl">{emoji}</span>
//           </div>
//         )}

//         {/* Featured badge */}
//         {product.featured && (
//           <div
//             className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full font-sans text-xs font-medium"
//             style={{ background: 'var(--peach)', color: 'white' }}
//           >
//             <Star size={11} fill="white" /> Featured
//           </div>
//         )}

//         {/* Hover overlay */}
//         <div
//           className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//           style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
//         >
//           <button
//             onClick={() => onInquire(product)}
//             className="btn-ghost text-xs py-2 px-5"
//           >
//             <MessageCircle size={14} />
//             Enquire Now
//           </button>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-5 flex flex-col flex-1">
//         <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase mb-1.5"
//           style={{ color: 'var(--peach)' }}>
//           {CATEGORY_LABELS[product.category] ?? product.category}
//         </p>
//         <h3 className="font-serif font-semibold mb-2" style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
//           {product.name}
//         </h3>
//         <p className="font-sans text-sm leading-relaxed flex-1 line-clamp-2 mb-4"
//           style={{ color: 'var(--text-secondary)' }}>
//           {product.description}
//         </p>
//         <div className="flex items-center justify-between mt-auto pt-3"
//           style={{ borderTop: '1px solid var(--cream)' }}>
//           <span className="font-serif font-semibold" style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>
//             {product.price > 0 ? `£${product.price.toFixed(0)}` : 'POA'}
//           </span>
//           <button
//             onClick={() => onInquire(product)}
//             className="btn-primary py-2 px-5 text-xs"
//           >
//             Enquire
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   )
// }