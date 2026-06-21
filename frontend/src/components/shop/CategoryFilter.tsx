// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\shop\CategoryFilter.tsx
import { motion } from 'framer-motion'
import type { ProductCategory } from '@/types'

const CATEGORIES: { value: ProductCategory | 'all'; label: string; emoji: string }[] = [
  { value: 'all',      label: 'All Cakes',     emoji: '🎂' },
  { value: 'celebration cakes',  label: 'celebration cakes',        emoji: '🎁' },
  { value: 'wedding cakes', label: 'Wedding Cakes',       emoji: '💍' },
  { value: 'cupcakes', label: 'Cupcakes',       emoji: '🧁' },
  { value: 'loaf cakes', label: 'Loaf Cakes',  emoji: '🍞' },
  { value: 'cookies & cookie dippers',   label: 'Cookies & Cookie Dippers',  emoji: '🍪' },
  { value: 'dessert boxes',   label: 'Dessert Boxes',  emoji: '🍮' },
  { value: 'sweet treats',   label: 'Sweet Treats',  emoji: '✨' },
  { value: 'african treats collection',   label: 'African Treats Collection',  emoji: '🌍' },
  { value: 'learn with haliberry',   label: 'Learn With Haliberry',  emoji: '🎓' },
]

interface Props {
  active: ProductCategory | 'all'
  onChange: (cat: ProductCategory | 'all') => void
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    /*
      Mobile: full-width horizontal scroll strip — no wrapping, no clipped edges.
      Desktop: wraps naturally in a flex row.
    */
    <div
      className="
        flex gap-2.5
        overflow-x-auto
        snap-x snap-mandatory
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        pb-0.5          /* prevent shadow clipping on mobile */
        -mx-4 px-4      /* bleed to screen edges on mobile for visual breathing room */
        sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible
      "
    >
      {CATEGORIES.map(({ value, label, emoji }) => {
        const isActive = active === value
        return (
          <motion.button
            key={value}
            onClick={() => onChange(value)}
            whileTap={{ scale: 0.97 }}
            /*
              Rectangular card shape — feels premium rather than casual pill/circle.
              flex-none keeps cards from shrinking on mobile scroll strip.
            */
            className="
              flex-none snap-start
              flex flex-col items-center justify-center gap-1.5
              w-[88px] sm:w-auto sm:flex-row sm:gap-2
              px-0 sm:px-5
              py-3 sm:py-2.5
              rounded-xl
              font-sans font-medium
              text-[10px] sm:text-xs
              tracking-wide
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--peach)]
            "
            style={{
              background:  isActive ? 'var(--peach)' : 'white',
              color:       isActive ? 'white' : 'var(--text-secondary)',
              border:      `1.5px solid ${isActive ? 'var(--peach)' : '#E8DDD6'}`,
              boxShadow:   isActive
                ? '0 4px 16px rgba(149,113,88,0.32)'
                : '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            {/* Emoji visible on both mobile (stacked) and desktop (inline) */}
            <span
              className="text-base sm:text-sm leading-none"
              aria-hidden
              style={{ filter: isActive ? 'brightness(1.15)' : 'none' }}
            >
              {emoji}
            </span>
            <span className="leading-tight text-center">{label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}


// // C:\Users\Melody\Documents\haliberrycake\frontend\src\components\shop\CategoryFilter.tsx
// import { motion } from 'framer-motion'
// import type { ProductCategory } from '@/types'

// const CATEGORIES: { value: ProductCategory | 'all'; label: string; emoji: string }[] = [
//   { value: 'all',      label: 'All Cakes',     emoji: '🎂' },
//   { value: 'wedding',  label: 'Wedding',        emoji: '💍' },
//   { value: 'birthday', label: 'Birthday',       emoji: '🎉' },
//   { value: 'cupcakes', label: 'Cupcakes',       emoji: '🧁' },
//   { value: 'desserts', label: 'Dessert Boxes',  emoji: '🎁' },   // was 'dessert_boxes'
//   { value: 'treats',   label: 'Luxury Treats',  emoji: '✨' },   // was 'luxury_treats'
// ]

// interface Props {
//   active: ProductCategory | 'all'
//   onChange: (cat: ProductCategory | 'all') => void
// }

// export default function CategoryFilter({ active, onChange }: Props) {
//   return (
//     <div className="flex flex-wrap gap-2">
//       {CATEGORIES.map(({ value, label, emoji }) => {
//         const isActive = active === value
//         return (
//           <motion.button
//             key={value}
//             onClick={() => onChange(value)}
//             whileTap={{ scale: 0.96 }}
//             className="flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-xs font-medium transition-all duration-200"
//             style={{
//               background: isActive ? 'var(--peach)'  : '#FDF7F2',
//               color:      isActive ? 'white'          : 'var(--text-secondary)',
//               border:     `1.5px solid ${isActive ? 'var(--peach)' : '#E0D0C5'}`,
//               boxShadow:  isActive ? '0 4px 14px rgba(149,113,88,0.35)' : 'none',
//             }}
//           >
//             <span aria-hidden>{emoji}</span>
//             {label}
//           </motion.button>
//         )
//       })}
//     </div>
//   )
// }

