import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  success: null,
  productInCart: 0,
};

const apiStatusSlice = createSlice({
  name: "api-status",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    clearSuccess(state) {
      state.success = null;
    },
    setproductInCart(state, action) {
      state.productInCart = action.payload;
    },
  },
});

export const {
  setError,
  clearError,
  setSuccess,
  clearSuccess,
  setproductInCart,
} = apiStatusSlice.actions;

export default apiStatusSlice.reducer;
