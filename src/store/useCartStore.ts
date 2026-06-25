import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  isLocationChanged: boolean;
  outOfRangeItemIds: string[];
  
  addItem: (product: any) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  
  openCart: () => void;
  closeCart: () => void;
  simulateLocationChange: (changed: boolean) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isCartOpen: false,
  isLocationChanged: false,
  outOfRangeItemIds: [],
  
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        isCartOpen: true // Open cart when adding item
      };
    } else {
      return {
        items: [...state.items, { ...product, quantity: 1 }],
        isCartOpen: true
      };
    }
  }),

  removeItem: (productId) => set((state) => {
    const existingItem = state.items.find(item => item.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      return {
        items: state.items.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      };
    } else {
      return {
        items: state.items.filter(item => item.id !== productId)
      };
    }
  }),

  clearCart: () => set({ items: [], isLocationChanged: false, outOfRangeItemIds: [] }),

  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  
  getTotalPrice: () => {
    const state = get();
    // Exclude out of range items from total price
    return state.items.reduce((total, item) => {
      if (state.outOfRangeItemIds.includes(item.id)) return total;
      return total + (item.price * item.quantity);
    }, 0);
  },

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  
  simulateLocationChange: (changed) => set((state) => {
    // If changed, flag the first item as out of range (if exists)
    if (changed && state.items.length > 0) {
      return { 
        isLocationChanged: true, 
        outOfRangeItemIds: [state.items[0].id] 
      };
    }
    return { 
      isLocationChanged: false, 
      outOfRangeItemIds: [] 
    };
  })
}));
