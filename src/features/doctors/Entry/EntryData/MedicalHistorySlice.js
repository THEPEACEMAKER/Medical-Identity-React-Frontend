import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/api";

export const fetchMedicalHistory = createAsyncThunk(
  "medicalHistory/fetchMedicalHistory",
  async (
    {
      specialization,
      isDoctor,
      isPatient,
      patientId,
      appointmentId,
      code,
      page,
      pageSize,
    },
    thunkAPI
  ) => {
    try {
      let url = "";
      if (specialization) {
        patientId = JSON.parse(localStorage.getItem("user")).id;
        url = `/medical-entry/patient/${patientId}/medical-entries/?specialization=${specialization}`;
      } else if (isPatient) {
        url = "/medical-entry/patient/list/";
      } else if (isDoctor) {
        if (!patientId || !appointmentId || !code) {
          // If any of the required values is missing
          throw new Error(
            "Incomplete request parameters, you need to enter your patient history using your dashboard"
          );
        }
        url = `/code/doctor/patient/${patientId}/medical-entries/appointment/${appointmentId}/`;
      }

      const requestOptions = {
        params: { page, size: pageSize },
      };

      // Adjust the request method based on isPatient value
      const response = isPatient
        ? await api.get(url, requestOptions)
        : await api.post(url, { code }, requestOptions);

      return {
        result: specialization ? response.data.results : response.data.result,
        count: response.data.count,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const MedicalHistorySlice = createSlice({
  name: "medicalHistory",
  initialState: {
    appointments: [],
    status: "idle",
    error: null,
    totalEntriesCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicalHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMedicalHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments = action.payload.result;
        state.totalEntriesCount = action.payload.count;
      })
      .addCase(fetchMedicalHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default MedicalHistorySlice.reducer;
