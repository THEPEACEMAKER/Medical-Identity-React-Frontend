import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name : "doctor",
    initialState:{
        appointments: [],
        availableAppointments: [],
        reservedAppointment: [],
        appointmentCount:null,
        isLoading: true,
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
        // getcategories(state,action){
        //     state.categories = action.payload.categories;
        //     state.isLoading = action.payload.isLoading;
        // }
    }
})

export const doctorActions = doctorSlice.actions
export default doctorSlice;