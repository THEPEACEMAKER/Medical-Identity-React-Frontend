import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name : "doctor",
    initialState:{
        appointments: [],
        availableAppointments: [],
        reservedAppointment: [],
        appointmentCount:null,
        isLoading: true,
        // nextAll: null,
        // previousAll: null,
        // nextAvailable: null,
        // previousAvailable: null,
        // nextReserverd: null,
        // previousReserved: null,

        next: null,
        previous: null,


        refresh: false
    },
    reducers:{
        replaceApointments(state, action){
            state.appointments = action.payload.data;
            state.availableAppointments = action.payload.availableAppointments;
            state.reservedAppointment = action.payload.reservedAppointment;
            state.appointmentCount = action.payload.appointmentCount;
            state.isLoading = action.payload.isLoading;
            state.next = action.payload.next;
            state.previous = action.payload.previous;
            state.refresh = action.payload.refresh;
        },
        updateAvailableAppointment(state, action) {
            // state.reservedAppointment = action.payload.reservedAppointment;
            // state.appointmentCount = action.payload.appointmentCount;
            // state.nextAvailable = action.payload.nextAvailable;
            // state.previousAvailable = action.payload.previousAvailable;
            state.appointmentCount = action.payload.appointmentCount;
            state.availableAppointments = action.payload.availableAppointments
            state.next = action.payload.next;
            state.previous = action.payload.previous;
          },
          updateReservedAppointment(state, action) {
            state.reservedAppointment = action.payload.reservedAppointment;
            state.appointmentCount = action.payload.appointmentCount;
            // state.nextAvailable = action.payload.nextAvailable;
            // state.previousAvailable = action.payload.previousAvailable;
            state.next = action.payload.next;
            state.previous = action.payload.previous;
          }
    }
})

export const doctorActions = doctorSlice.actions
export default doctorSlice;