// redux/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('reduxCart');
    if (serializedCart === null) {
      return { items: [] };
    }
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Failed to load cart from localStorage", e);
    return { items: [] };
  }
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cartState) => {
  try {
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem('reduxCart', serializedCart);
  } catch (e) {
    console.warn("Failed to save cart to localStorage", e);
  }
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1, selected: false });
      }
      saveCartToLocalStorage(state);
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveCartToLocalStorage(state);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state);
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state);
      }
    },
    toggleItemSelection: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item) {
        item.selected = !item.selected;
        saveCartToLocalStorage(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state);
    },
    // Add a new reducer to load cart from localStorage
    loadCart: (state) => {
      const loadedCart = loadCartFromLocalStorage();
      return loadedCart;
    },
    
    selectAllItems: (state, action) => {
      const shouldSelect = action.payload !== undefined ? action.payload : !state.items.every(item => item.selected);
      state.items.forEach(item => {
        item.selected = shouldSelect;
      });
      saveCartToLocalStorage(state);
    },
  }
});

export const selectCartTotal = (state) => {
  return state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const selectSelectedItemsTotal = (state) => {
  return state.cart.items.reduce((total, item) => {
    if (item.selected) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);
};

export const selectSelectedItemsTotalAmount = (state) => {
  return state.cart.items
    .filter(item => item.selected)
    .reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const selectSelectedItemsCount = (state) => {
  return state.cart.items.filter(item => item.selected).length;
};

export const { 
  addItemToCart, 
  removeItemFromCart, 
  incrementQuantity, 
  decrementQuantity,
  toggleItemSelection,
  clearCart,
  loadCart,
  selectAllItems,
} = cartSlice.actions;

export default cartSlice.reducer;