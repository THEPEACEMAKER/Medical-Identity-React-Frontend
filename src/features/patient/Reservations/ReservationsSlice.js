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
    reservations: [
      {
        id: 1,
        appointment_time: "08:00 PM",
        appointment_duration: 60,
        appointment_date: "2023-07-02",
        appointment_price: 1111.0,
        doctor_name: "Adel Kenawy",
        status: "R",
        patient: 3,
        appointment: 2,
        doctor: {
          id: 2,
          first_name: "moustafa",
          last_name: "mohamed",
          email: "moustafa@gmail.com",
          date_of_birth: "1990-12-12",
          phone: "01033022410",
          national_id: "29510010402099",
          profileImgUrl: "image/upload/v1688058547/jyqnachpltnpmc0ucaid.webp",
          gender: "male",
          specialization: {
            id: 1,
            name: "assd",
          },
          profLicenseNo: "221133",
          city: 1,
          district: 2,
          address: "street 9",
        },
      },
    ],
    status: "idle",
    error: null,
    totalCount: 5,
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
      });
  },
});

export default reservationsSlice.reducer;
