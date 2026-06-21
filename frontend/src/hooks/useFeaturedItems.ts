// C:\Users\Melody\Documents\haliberrycake\frontend\src\hooks\useFeaturedItems.ts
import { useQuery } from '@tanstack/react-query'
import { featuredItemsApi } from '@/lib/api'

export interface FeaturedItem {
  id: string
  title: string
  image_url: string | null
  category_slug: string
  link_override: string | null
  group: string
  sort_order: number
  is_active: boolean
  is_showcase: boolean
  caption: string | null
  created_at: string
  updated_at: string
}

/**
 * Public hook — powers the homepage "stories" carousel in HeroSection.tsx.
 * Returns only active items, already ordered by group then sort_order
 * (the backend does the sorting, so no client-side re-sort needed).
 */
export function useFeaturedItems() {
  return useQuery<FeaturedItem[]>({
    queryKey: ['featured-items'],
    queryFn: async () => {
      const { data } = await featuredItemsApi.list(true)
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Admin hook — includes inactive items too, so the dashboard can show
 * (and let the admin re-enable) hidden tiles.
 */
export function useAllFeaturedItemsAdmin() {
  return useQuery<FeaturedItem[]>({
    queryKey: ['featured-items', 'admin-all'],
    queryFn: async () => {
      const { data } = await featuredItemsApi.list(false)
      return data
    },
    staleTime: 30 * 1000,
  })
}