// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\home\GalleryPreview.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Instagram, Heart } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { galleryApi } from '@/lib/api'
import { fadeUp, staggerContainer, floatSlow } from '@/lib/animations'
import type { GalleryItem } from '@/types'

// Elegant fallback gradients for when images aren't available
const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, rgba(248,244,240,0.8) 0%, rgba(255,255,255,0.9) 100%)',
  'linear-gradient(135deg, rgba(255,248,245,0.8) 0%, rgba(255,255,255,0.9) 100%)',
  'linear-gradient(135deg, rgba(245,248,250,0.8) 0%, rgba(255,255,255,0.9) 100%)',
  'linear-gradient(135deg, rgba(250,245,240,0.8) 0%, rgba(255,255,255,0.9) 100%)',
  'linear-gradient(135deg, rgba(248,244,240,0.8) 0%, rgba(255,255,255,0.9) 100%)',
  'linear-gradient(135deg, rgba(255,250,240,0.8) 0%, rgba(255,255,255,0.9) 100%)'
]

// Grid span classes — mirrors the original layout
const SPAN_CLASSES = ['row-span-2', '', '', 'col-span-2', '', '']

export default function GalleryPreview() {
  const { data } = useQuery<GalleryItem[]>({
    queryKey: ['gallery-preview'],
    queryFn: async () => {
      const res = await galleryApi.list({ featured_only: true })
      // Backend returns array directly for gallery
      return (res.data?.items ?? res.data) as GalleryItem[]
    },
    staleTime: 1000 * 60 * 10, // 10 min cache — gallery changes infrequently
  })

  // Use up to 6 items for a more luxurious feel; pad with null placeholders so layout never breaks
  const raw = Array.isArray(data) ? data.slice(0, 6) : []
  const items: (GalleryItem | null)[] = [...raw, ...Array(Math.max(0, 6 - raw.length)).fill(null)]

  return (
    <section className="relative py-10 lg:py-20 overflow-hidden" style={{
      background: 'linear-gradient(180deg, var(--cream-white) 0%, var(--cream) 100%)'
    }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 left-0 w-[160px] h-[160px] rounded-full opacity-[0.06] hidden lg:block"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(149,113,88,0.1), transparent 70%)',
            transform: 'translate(-20%, -20%)'
          }}
          variants={floatSlow}
          initial="rest"
          animate="float"
          transition={{ delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[140px] h-[140px] rounded-full opacity-[0.04] hidden lg:block"
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(149,113,88,0.08), transparent 70%)',
            transform: 'translate(20%, 20%)'
          }}
          variants={floatSlow}
          initial="rest"
          animate="float"
          transition={{ delay: 1.2 }}
        />

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <motion.span variants={fadeUp} className="section-eyebrow block mb-3">
              Our Gallery
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title">
              Crafted with
              <em className="not-italic" style={{
                color: 'var(--peach)',
                fontSize: '1.1rem'
              }}> Love & Artistry</em>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link to="/gallery" className="btn-outline">
              View Full Gallery
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Elegant decorative divider */}
        <motion.div
          className="flex items-center gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="w-[50px] h-[1px] bg-[var(--peach)]/25" />
          <span className="font-serif text-[var(--peach)] text-lg">✦ ✦ ✦</span>
          <div className="w-[50px] h-[1px] bg-[var(--peach)]/25" />
        </motion.div>

        {/* Masonry-style grid - More spacious and elegant */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[220px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item, index) => {
            const fallback = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length]
            const label = item?.caption ?? item?.category ?? 'Haliberry Cake'
            const spanClass = SPAN_CLASSES[index] ?? ''

            return (
              <motion.div
                key={item?.id ?? `gallery-${index}`}
                variants={fadeUp}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer ${spanClass}`}
                style={{
                  background: fallback,
                  border: '1px solid rgba(149,113,88,0.1)'
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                {/* Real image — shown on top of gradient if available */}
                {item?.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.alt_text ?? label}
                    className="absolute inset-0 w-full h-full object-cover"
                    // On error fall back gracefully to the gradient behind
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                )}

                {/* Elegant hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(149,113,88,0.2)'
                  }}
                >
                  <div className="flex flex-col items-center">
                    <Instagram size={24} color="white" className="mb-3" />
                    <p className="font-sans text-xs font-medium text-white tracking-wide">{label}</p>
                    <Heart size={14} color="white" className="mt-3" style={{ opacity: 0.7 }} />
                  </div>
                </div>

                {/* Label pill - More refined */}
                <div
                  className="absolute bottom-4 left-4 font-sans text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(149,113,88,0.15)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Instagram CTA - Enhanced */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://instagram.com/haliberrycake"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans text-sm font-medium transition-colors hover:text-[var(--peach)]"
            style={{
              color: 'var(--text-secondary)',
              background: 'rgba(149,113,88,0.08)',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(149,113,88,0.2)'
            }}
          >
            <Instagram size={20} />
            <span>Follow @haliberrycake on Instagram</span>
            <ArrowRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  )
}

// // C:\Users\Melody\Documents\haliberrycake\frontend\src\components\home\GalleryPreview.tsx
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { ArrowRight, Instagram } from 'lucide-react'
// import { fadeUp, staggerContainer } from '@/lib/animations'

// // Placeholder gallery items — replace src with real Cloudinary/Supabase URLs
// const GALLERY_ITEMS = [
//   { id: 1, bg: 'linear-gradient(135deg, #F8A974, #FBD6B2)', label: 'Wedding Tier', span: 'row-span-2' },
//   { id: 2, bg: 'linear-gradient(135deg, #F2B6B8, #F8A974)', label: 'Birthday Cake', span: '' },
//   { id: 3, bg: 'linear-gradient(135deg, #F6E2B5, #FBD6B2)', label: 'Cupcakes', span: '' },
//   { id: 4, bg: 'linear-gradient(135deg, #F2E8E1, #F6E2B5)', label: 'Dessert Box', span: 'col-span-2' },
//   { id: 5, bg: 'linear-gradient(135deg, #FBD6B2, #F2B6B8)', label: 'Luxury Treats', span: '' },
// ]

// export default function GalleryPreview() {
//   return (
//     <section className="py-24 lg:py-32" style={{ background: 'linear-gradient(180deg, #FDF7F2 0%, white 100%)' }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <motion.div
//           className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12"
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <div>
//             <motion.span variants={fadeUp} className="section-eyebrow block mb-3">Our Gallery</motion.span>
//             <motion.h2 variants={fadeUp} className="section-title">
//               Crafted with
//               <em className="not-italic" style={{ color: 'var(--peach)' }}> Love</em>
//             </motion.h2>
//           </div>
//           <motion.div variants={fadeUp}>
//             <Link to="/gallery" className="btn-outline text-sm">
//               View All
//               <ArrowRight size={15} />
//             </Link>
//           </motion.div>
//         </motion.div>

//         {/* Masonry-style grid */}
//         <motion.div
//           className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]"
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.1 }}
//         >
//           {GALLERY_ITEMS.map((item) => (
//             <motion.div
//               key={item.id}
//               variants={fadeUp}
//               className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
//               style={{ background: item.bg }}
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.35 }}
//             >
//               {/* Hover overlay */}
//               <div
//                 className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
//                 style={{ background: 'rgba(0,0,0,0.55)' }}
//               >
//                 <Instagram size={22} color="white" className="mb-2" />
//                 <p className="font-sans text-xs text-white tracking-wide">{item.label}</p>
//               </div>

//               {/* Label */}
//               <div
//                 className="absolute bottom-3 left-3 font-sans text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--text-secondary)' }}
//               >
//                 {item.label}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Instagram CTA */}
//         <motion.div
//           className="text-center mt-12"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <a
//             href="https://instagram.com/haliberrycake"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 font-sans text-sm font-medium transition-colors hover:text-[var(--peach)]"
//             style={{ color: 'var(--text-secondary)' }}
//           >
//             <Instagram size={18} />
//             Follow @haliberrycake on Instagram
//             <ArrowRight size={14} />
//           </a>
//         </motion.div>

//       </div>
//     </section>
//   )
// }