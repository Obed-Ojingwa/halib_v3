import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '@/types'

export interface CartItem {
  product_id: string
  product_name: string
  image_url: string | null
  unit_price: number
  quantity: number
  custom_message?: string
  fulfilment_class?: 'physical' | 'digital' | 'quote_only'
}

interface CartContextValue {
  items: CartItem[]
  cartCount: number
  subtotal: number
  addToCart: (product: Product, quantity?: number, custom_message?: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateMessage: (productId: string, custom_message: string) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

const STORAGE_KEY = 'haliberry_cart'
const CartContext = createContext<CartContextValue | null>(null)

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) as CartItem[] : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart())

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0), [items])

  const addToCart = (product: Product, quantity = 1, custom_message?: string) => {
    const product_id = String(product.id)
    setItems((current) => {
      const existing = current.find(item => item.product_id === product_id)
      if (existing) {
        return current.map(item =>
          item.product_id === product_id
            ? { ...item, quantity: item.quantity + quantity, custom_message: custom_message ?? item.custom_message }
            : item,
        )
      }
      return [
        ...current,
        {
          product_id,
          product_name: product.name,
          image_url: product.image_url,
          unit_price: product.price,
          quantity,
          custom_message,
          fulfilment_class: product.fulfilment_class ?? 'physical',
        },
      ]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter(item => item.product_id !== productId)
      }
      return current.map(item =>
        item.product_id === productId
          ? { ...item, quantity }
          : item,
      )
    })
  }

  const updateMessage = (productId: string, custom_message: string) => {
    setItems((current) =>
      current.map(item =>
        item.product_id === productId
          ? { ...item, custom_message }
          : item,
      ),
    )
  }

  const removeFromCart = (productId: string) => {
    setItems((current) => current.filter(item => item.product_id !== productId))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, cartCount, subtotal, addToCart, updateQuantity, updateMessage, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
