import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";
const URL = process.env.REACT_APP_BASE_API_URL;
export const fetchDoctor = createAsyncThunk(
  "doctorData/fetchDoctor",
  async ({ id, pageSize, page }, thunkAPI) => {
    try {
      let url = `/account/doctor/${id}/`;
      console.log(id);
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

const DoctorSlice = createSlice({
  name: "doctorData",
  initialState: {
    doctor: {},
    status: "idle",
    error: null,
    totaldoctorsCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctor = action.payload;
        state.totaldoctorsCount = action.payload.count;
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});

export default DoctorSlice.reducer;
