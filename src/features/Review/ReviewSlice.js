import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const fetchReview = createAsyncThunk(
  "doctorReview/fetchReview",
  async ({ id, pageSize, page }, thunkAPI) => {
    try {
      let url = `/review/${id}/`;
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

export const createReview = createAsyncThunk(
  "doctorReview/createReview",
  async ({ id, comment }, thunkAPI) => {
    try {
      const response = await api.post(`/review/create/${id}/`, {
        comment,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ReviewSlice = createSlice({
  name: "doctorReview",
  initialState: {
    reviews: [],
    status: "idle",
    error: null,
    totaldoctorsCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload.results;
        state.totaldoctorsCount = action.payload.count;
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export default ReviewSlice.reducer;
