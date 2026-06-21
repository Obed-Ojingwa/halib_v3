// C:\Users\Melody\Documents\haliberrycake\frontend\src\lib\categories.ts

/**
 * SINGLE SOURCE OF TRUTH for product categories.
 *
 * Previously these were duplicated — and drifting — across:
 *   - CategoryFilter.tsx   (value/label/emoji)
 *   - ProductCard.tsx      (CATEGORY_COLOURS / CATEGORY_EMOJI / CATEGORY_LABELS, keyed differently!)
 *   - ProductShowcase.tsx  (id/label/emoji/description/gradient)
 *
 * `slug` is the canonical value stored on Product.category in the backend,
 * and is also what FeaturedItem.category_slug must match for the homepage
 * "stories" carousel to correctly link through to /shop?category=<slug>.
 *
 * Every other file should import CATEGORIES (or the helper functions below)
 * instead of redeclaring its own list.
 */

export interface CategoryDef {
  slug: string
  label: string
  emoji: string
  /** Short marketing line, used by ProductShowcase cards */
  description: string
  /** Starting price display, used by ProductShowcase cards */
  startingFrom: string
  /**
   * Where clicking this category should navigate.
   * Defaults to `/shop?category=<slug>` if omitted — only set this
   * for categories that intentionally go somewhere else entirely
   * (e.g. "Learn With Haliberry" → /cake-classes, not the shop).
   */
  linkOverride?: string
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: 'celebration cakes',
    label: 'Celebration Cakes',
    emoji: '🎂',
    description: 'Bespoke celebration cakes crafted with personality and panache.',
    startingFrom: '£120',
  },
  {
    slug: 'wedding cakes',
    label: 'Wedding Cakes',
    emoji: '💍',
    description: 'Bespoke tiered masterpieces for your most cherished day.',
    startingFrom: '£350',
  },
  {
    slug: 'cupcakes',
    label: 'Cupcakes',
    emoji: '🧁',
    description: 'Handcrafted cupcakes, beautifully finished for any occasion.',
    startingFrom: '£28',
  },
  {
    slug: 'loaf cakes',
    label: 'Loaf Cakes',
    emoji: '🍞',
    description: 'Classic baked goods with a modern twist.',
    startingFrom: '£48',
  },
  {
    slug: 'cookies & cookie dippers',
    label: 'Cookies & Cookie Dippers',
    emoji: '🍪',
    description: 'Artisan cookies and dippers, perfect for sharing or gifting.',
    startingFrom: '£18',
  },
  {
    slug: 'dessert boxes',
    label: 'Dessert Boxes',
    emoji: '🎁',
    description: 'Curated boxes of joy — gifting at its finest.',
    startingFrom: '£35',
  },
  {
    slug: 'sweet treats',
    label: 'Sweet Treats',
    emoji: '✨',
    description: 'Handcrafted chocolates, petit fours, and sweet morsels.',
    startingFrom: '£22',
  },
  {
    slug: 'african treats collection',
    label: 'African Treats Collection',
    emoji: '🌍',
    description: 'A unique blend of traditional and modern flavours.',
    startingFrom: '£22',
  },
  {
    slug: 'learn with haliberry',
    label: 'Learn With Haliberry',
    emoji: '🎓',
    description: 'Hands-on baking classes and masterclasses with Halimot.',
    startingFrom: '£65',
    linkOverride: '/cake-classes',
  },
]

/** Quick lookup map: slug → CategoryDef */
export const CATEGORY_MAP: Record<string, CategoryDef> = Object.fromEntries(
  CATEGORIES.map(c => [c.slug, c]),
)

export function getCategory(slug: string): CategoryDef | undefined {
  return CATEGORY_MAP[slug]
}

/** Resolves where a category tile/link should navigate to. */
export function getCategoryHref(slug: string): string {
  const cat = getCategory(slug)
  if (cat?.linkOverride) return cat.linkOverride
  return `/shop?category=${encodeURIComponent(slug)}`
}

export function getCategoryLabel(slug: string): string {
  return getCategory(slug)?.label ?? slug
}

export function getCategoryEmoji(slug: string): string {
  return getCategory(slug)?.emoji ?? '🎂'
}