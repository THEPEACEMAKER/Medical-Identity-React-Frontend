import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchProductHomePage = createAsyncThunk(
  "products/fetchProductHomePage",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/products/?size=20`);
      return response.data;

      console.log(response);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productHomePageSlice = createSlice({
  name: "productHomePage",
  initialState: {
    productHomePage: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductHomePage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductHomePage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productHomePage = action.payload;
      })
      .addCase(fetchProductHomePage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productHomePageSlice.reducer;
