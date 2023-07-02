import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";

export const fetchReservations = createAsyncThunk(
  "patientReservations/fetchReservations",
  async ({ pageSize, page }, thunkAPI) => {
    try {
      const response = await api.get("/reservation/", {
        params: {
          page,
          size: pageSize,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const reservationsSlice = createSlice({
  name: "patientReservations",
  initialState: {
    reservations: [],
    status: "idle",
    error: null,
    totalCount: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reservations = action.payload;
        state.totalCount = action.payload.count;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default reservationsSlice.reducer;
