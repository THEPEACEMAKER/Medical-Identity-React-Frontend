import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";

export const fetchReservations = createAsyncThunk(
  "patientReservations/fetchReservations",
  async ({ pageSize, page }, thunkAPI) => {
    try {
      const response = await api.get("/reservation/patient/list/reserved/", {
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

export const cancelReservation = createAsyncThunk(
  "patientReservations/cancelReservation",
  async (reservationId, thunkAPI) => {
    try {
      await api.delete(`/reservation/patient/delete/${reservationId}/`);
      return reservationId;
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
    cancelStatus: "idle",
    cancelError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reservations = action.payload.results;
        state.totalCount = action.payload.count;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(cancelReservation.pending, (state) => {
        state.cancelStatus = "loading";
        state.cancelError = null;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.cancelStatus = "succeeded";
        const reservationId = action.payload;
        state.reservations = state.reservations.filter(
          (reservation) => reservation.id !== reservationId
        );
        state.totalCount -= 1;
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.cancelStatus = "failed";
        state.cancelError = action.error;
      });
  },
});

export default reservationsSlice.reducer;
