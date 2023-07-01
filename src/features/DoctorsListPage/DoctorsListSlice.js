import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchDoctorsBySpecializations = createAsyncThunk(
  "doctorsPage/fetchDoctorsBySpecializations",
  async (
    { selectedCity, selectedDistrict, specializationId, pageSize, page },
    thunkAPI
  ) => {
    try {
      let url = `/account/doctor/specialization/${specializationId}/`;

      if (selectedDistrict) {
        url = `/account/doctor/city/${selectedCity}/district/${selectedDistrict}/specialization/${specializationId}/`;
      }

      const response = await api.get(url, {
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

const doctorsListSlice = createSlice({
  name: "doctorsPage",
  initialState: {
    doctors: [],
    status: "idle",
    error: null,
    totaldoctorsCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorsBySpecializations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctorsBySpecializations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload.results;
        state.totaldoctorsCount = action.payload.count;
      })
      .addCase(fetchDoctorsBySpecializations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});

export default doctorsListSlice.reducer;
