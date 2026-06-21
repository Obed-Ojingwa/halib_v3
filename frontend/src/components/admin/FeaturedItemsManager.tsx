// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\admin\FeaturedItemsManager.tsx
import { useState, useRef, useEffect } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { Plus, Trash2, Upload, Star, Eye, EyeOff, GripVertical, X, Loader2 } from 'lucide-react'
import { featuredItemsApi } from '@/lib/api'
import { useAllFeaturedItemsAdmin, type FeaturedItem } from '@/hooks/useFeaturedItems'
import { CATEGORIES } from '@/lib/categories'

/* ─────────────────────────────────────────────
   Single row — image upload, title edit, toggles
───────────────────────────────────────────── */
function FeaturedItemRow({ item }: { item: FeaturedItem }) {
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState(item.title)
  const [categorySlug, setCategorySlug] = useState(item.category_slug)

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['featured-items'] })

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => featuredItemsApi.update(item.id, data),
    onSuccess: invalidate,
  })

  const uploadMutation = useMutation({
    mutationFn: (file: File) => featuredItemsApi.uploadImage(item.id, file),
    onSuccess: invalidate,
  })

  const deleteMutation = useMutation({
    mutationFn: () => featuredItemsApi.delete(item.id),
    onSuccess: invalidate,
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) uploadMutation.mutate(file)
  }

  function commitTitle() {
    if (title.trim() && title !== item.title) {
      updateMutation.mutate({ title: title.trim() })
    }
  }

  function commitCategory(slug: string) {
    setCategorySlug(slug)
    updateMutation.mutate({ category_slug: slug })
  }

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      className="flex items-center gap-4 bg-white rounded-2xl p-4 border"
      style={{ borderColor: '#E8DDD6', position: 'relative' }}
    >
      {/* Drag handle */}
      <div className="cursor-grab active:cursor-grabbing text-[var(--text-muted)] flex-shrink-0">
        <GripVertical size={18} />
      </div>

      {/* Thumbnail / upload */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 group"
        style={{ borderColor: '#E8DDD6', background: 'var(--cream)' }}
      >
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🎂</div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
          {uploadMutation.isPending ? (
            <Loader2 size={18} className="text-white animate-spin" />
          ) : (
            <Upload size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </button>

      {/* Title + category */}
      <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={commitTitle}
          placeholder="e.g. 🎂 Celebration Cakes"
          className="w-full px-3 py-2 rounded-lg font-sans text-sm outline-none"
          style={{ background: '#FDF7F2', border: '1.5px solid #E8DDD6', color: 'var(--text-primary)' }}
        />
        <select
          value={categorySlug}
          onChange={e => commitCategory(e.target.value)}
          className="w-full px-3 py-2 rounded-lg font-sans text-sm outline-none"
          style={{ background: '#FDF7F2', border: '1.5px solid #E8DDD6', color: 'var(--text-secondary)' }}
        >
          {CATEGORIES.map(c => (
            <option key={c.slug} value={c.slug}>{c.emoji} {c.label}</option>
          ))}
        </select>
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Showcase toggle */}
        <button
          onClick={() => updateMutation.mutate({ is_showcase: !item.is_showcase })}
          title={item.is_showcase ? 'Shown in "This Week\'s Favourite" rotation' : 'Add to "This Week\'s Favourite" rotation'}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{
            background: item.is_showcase ? 'var(--peach)' : '#FDF7F2',
            color: item.is_showcase ? 'white' : 'var(--text-muted)',
            border: `1.5px solid ${item.is_showcase ? 'var(--peach)' : '#E8DDD6'}`,
          }}
        >
          <Star size={15} fill={item.is_showcase ? 'white' : 'none'} />
        </button>

        {/* Active/hidden toggle */}
        <button
          onClick={() => updateMutation.mutate({ is_active: !item.is_active })}
          title={item.is_active ? 'Visible on site — click to hide' : 'Hidden — click to show'}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{
            background: item.is_active ? '#E8F5E9' : '#FDF7F2',
            color: item.is_active ? '#4CAF50' : 'var(--text-muted)',
            border: `1.5px solid ${item.is_active ? '#4CAF50' : '#E8DDD6'}`,
          }}
        >
          {item.is_active ? <Eye size={15} /> : <EyeOff size={15} />}
        </button>

        {/* Delete */}
        <button
          onClick={() => {
            if (confirm(`Delete "${item.title}"? This can't be undone.`)) deleteMutation.mutate()
          }}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50"
          style={{ color: '#e06a6a', border: '1.5px solid #F2D5D5' }}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </Reorder.Item>
  )
}

/* ─────────────────────────────────────────────
   Add-new-item inline form
───────────────────────────────────────────── */
function AddItemForm({ group, onClose }: { group: string; onClose: () => void }) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [categorySlug, setCategorySlug] = useState(CATEGORIES[0].slug)

  const createMutation = useMutation({
    mutationFn: () =>
      featuredItemsApi.create({
        title: title.trim(),
        category_slug: categorySlug,
        group,
        sort_order: 999, // pushed to end; admin can drag to reorder
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured-items'] })
      onClose()
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center gap-3 bg-[#FDF7F2] rounded-2xl p-4 border border-dashed"
      style={{ borderColor: 'var(--peach)' }}
    >
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title, e.g. 🎂 Celebration Cakes"
        className="flex-1 px-3 py-2 rounded-lg font-sans text-sm outline-none"
        style={{ background: 'white', border: '1.5px solid #E8DDD6' }}
        autoFocus
      />
      <select
        value={categorySlug}
        onChange={e => setCategorySlug(e.target.value)}
        className="px-3 py-2 rounded-lg font-sans text-sm outline-none"
        style={{ background: 'white', border: '1.5px solid #E8DDD6' }}
      >
        {CATEGORIES.map(c => (
          <option key={c.slug} value={c.slug}>{c.emoji} {c.label}</option>
        ))}
      </select>
      <button
        onClick={() => title.trim() && createMutation.mutate()}
        disabled={!title.trim() || createMutation.isPending}
        className="btn-primary py-2 px-4 text-xs flex-shrink-0"
      >
        {createMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : 'Add'}
      </button>
      <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] flex-shrink-0">
        <X size={16} />
      </button>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Group section — its own reorder context
───────────────────────────────────────────── */
function GroupSection({ groupKey, label, items }: { groupKey: string; label: string; items: FeaturedItem[] }) {
  const queryClient = useQueryClient()
  const [localOrder, setLocalOrder] = useState(items)
  const [showAddForm, setShowAddForm] = useState(false)

  // Keep local order in sync when server data changes (uploads, toggles, etc.)
  // but don't fight the user mid-drag — only resync if the *set* of ids changed
  // (an item was added/removed/deleted), not just their order.
  useEffect(() => {
    const serverIds = items.map(i => i.id).sort().join(',')
    const localIds = localOrder.map(i => i.id).sort().join(',')
    if (serverIds !== localIds) {
      setLocalOrder(items)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const reorderMutation = useMutation({
    mutationFn: async (ordered: FeaturedItem[]) => {
      await Promise.all(
        ordered.map((item, index) => featuredItemsApi.update(item.id, { sort_order: index })),
      )
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['featured-items'] }),
  })

  function handleReorder(newOrder: FeaturedItem[]) {
    setLocalOrder(newOrder)
    reorderMutation.mutate(newOrder)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
          {label}
        </h3>
        <button
          onClick={() => setShowAddForm(v => !v)}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--peach)', border: '1.5px solid var(--peach)' }}
        >
          <Plus size={14} /> Add Item
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && <AddItemForm group={groupKey} onClose={() => setShowAddForm(false)} />}
      </AnimatePresence>

      {localOrder.length === 0 ? (
        <p className="font-sans text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>
          No items in this row yet.
        </p>
      ) : (
        <Reorder.Group axis="y" values={localOrder} onReorder={handleReorder} className="space-y-3">
          {localOrder.map(item => (
            <FeaturedItemRow key={item.id} item={item} />
          ))}
        </Reorder.Group>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main exported component
───────────────────────────────────────────── */
export default function FeaturedItemsManager() {
  const { data: items, isLoading } = useAllFeaturedItemsAdmin()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin" style={{ color: 'var(--peach)' }} />
      </div>
    )
  }

  const row1 = (items ?? []).filter(i => i.group === 'row_1')
  const row2 = (items ?? []).filter(i => i.group === 'row_2')
  const showcaseCount = (items ?? []).filter(i => i.is_showcase && i.is_active).length

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif font-semibold text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
          Homepage Stories Carousel
        </h2>
        <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
          Manage the Instagram-style image circles on the homepage hero. Drag to reorder,
          click a thumbnail to replace its image, and tap the star to include it in the
          rotating "This Week's Favourite" showcase.
        </p>
        {showcaseCount === 0 && (
          <p className="font-sans text-xs mt-2 px-3 py-2 rounded-lg inline-block" style={{ background: '#FFF8E1', color: '#9c7a1f' }}>
            ⚠ No items marked as showcase yet — the homepage favourite card will show nothing until you star at least one.
          </p>
        )}
      </div>

      <GroupSection groupKey="row_1" label="Row 1" items={row1} />
      <GroupSection groupKey="row_2" label="Row 2" items={row2} />
    </div>
  )
}