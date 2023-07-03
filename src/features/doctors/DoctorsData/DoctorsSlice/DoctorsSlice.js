import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/api";

export const fetchDoctors = createAsyncThunk(
  "doctorsData/fetchDoctors",
  async ({ pageSize, page }, thunkAPI) => {
    try {
      let url = `/account/doctor/list/`;
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
  name: "doctorsData",
  initialState: {
    doctors: [],
    status: "idle",
    error: null,
    totaldoctorsCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload.results;
        state.totaldoctorsCount = action.payload.count;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});

export default doctorsListSlice.reducer;
