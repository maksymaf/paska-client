import { create } from 'zustand'

interface Paska {
  _id: string,
  name: string,
  price: number,
  description: string,
  image: string
}

interface CartItem extends Paska {
  quantity: number
}

interface CartStore {
  items: CartItem[],
  addItem: (paska: Paska) => void,
  removeItem: (id: string) => void,
  clearCart: () => void,
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (paska) => set((state) => {
    const existing = state.items.find(i => i._id === paska._id);
    if (existing) {
      return { items: state.items.map(i => i._id === paska._id ? { ...i, quantity: i.quantity + 1 } : i) };
    }
    return { items: [...state.items, { ...paska, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i._id !== id) })),
  clearCart: () => set({ items: [] }),
}));

