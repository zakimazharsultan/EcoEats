import { createSlice } from "@reduxjs/toolkit";

export const InventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventory: [],
  },
  reducers: {
    addToInventory: (state, action) => {
      const itemPresent = state.inventory.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.inventory.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromInventory: (state, action) => {
      const removeItem = state.inventory.filter(
        (item) => item.id !== action.payload.id
      );
      state.inventory = removeItem;
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.inventory.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.inventory.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.quantity == 1) {
        itemPresent.quantity = 0;
        const removeItem = state.inventory.filter(
          (item) => item.id !== action.payload.id
        );
        state.inventory = removeItem;
      } else {
        itemPresent.quantity--;
      }
    },
    cleanInventory: (state) => {
      state.inventory = [];
    },
  },
});

export const {
  addToInventory,
  removeFromInventory,
  incrementQuantity,
  decrementQuantity,
  cleanInventory,
} = InventorySlice.actions;

export default InventorySlice.reducer;
