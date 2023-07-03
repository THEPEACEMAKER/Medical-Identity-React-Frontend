import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/api";

export const fetchMedicalHistory = createAsyncThunk(
  "medicalHistory/fetchMedicalHistory",
  async (
    { isPatient, patientId, appointmentId, code, page, pageSize },
    thunkAPI
  ) => {
    try {
      let url = "";
      if (isPatient) {
        url = "/medical-entry/patient/list/";
      } else {
        url = `/code/doctor/patient/${patientId}/medical-entries/appointment/${appointmentId}/`;
      }

      const requestOptions = {
        params: { page, size: pageSize },
      };

      // Adjust the request method based on isPatient value
      const response = isPatient
        ? await api.get(url, requestOptions)
        : await api.post(url, { code });
      // await api.post(url, { code }, requestOptions); TODO, when pagination is implemented for doctors

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const MedicalHistorySlice = createSlice({
  name: "medicalHistory",
  initialState: {
    appointments: [
      {
        id: 3,
        comment: "Medical comment for patient 3",
        prescription_image: "Prescription for patient 3",
        analysis_image: "Radiology for patient 3",
        patient: {
          id: 3,
          first_name: "Alice",
          last_name: "Smith",
          date_of_birth: "1975-01-01",
          phone: "555-9012",
          gender: "Female",
          profileImgUrl: "image/upload/v1688154577/alicesmith.png",
        },
        doctor: {
          id: 2,
          specialization: "Internal medicine",
          city: "Cairo",
          district: "15 May",
          first_name: "omar",
          last_name: "amgad",
          email: "omar@gmail.com",
          date_of_birth: "1990-12-12",
          phone: "01033022410",
          national_id: "29510010402099",
          profileImgUrl: "image/upload/v1688154560/iuvk4eqvv59ogz61wh6a.jpg",
          gender: "male",
          profLicenseNo: "221133",
          address: "street 9",
        },
        created_at: "2023-07-03T10:00:00.000000Z",
        updated_at: "2023-07-03T10:00:00.000000Z",
      },
      {
        id: 4,
        comment: "Medical comment for patient 4",
        prescription_image: null,
        analysis_image: null,
        patient: {
          id: 4,
          first_name: "Bob",
          last_name: "Johnson",
          date_of_birth: "1990-01-01",
          phone: "555-2345",
          gender: "Male",
          profileImgUrl: "image/upload/v1688154577/bobjohnson.png",
        },
        doctor: {
          id: 2,
          specialization: "Internal medicine",
          city: "Cairo",
          district: "15 May",
          first_name: "islam",
          last_name: "Sulaiman",
          email: "omar@gmail.com",
          date_of_birth: "1990-12-12",
          phone: "01033022410",
          national_id: "29510010402099",
          profileImgUrl: "image/upload/v1688154560/iuvk4eqvv59ogz61wh6a.jpg",
          gender: "male",
          profLicenseNo: "221133",
          address: "street 9",
        },
        created_at: "2023-07-03T11:00:00.000000Z",
        updated_at: "2023-07-03T11:00:00.000000Z",
      },
    ],
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
        state.error = action.payload.error;
      });
  },
});

export default MedicalHistorySlice.reducer;
