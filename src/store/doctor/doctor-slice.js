import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name : "doctor",
    initialState:{
        appointments: [],
        availableAppointments: [],
        appointmentCount:null,
        isLoading: true,
        next: null,
        previous: null
    },
    reducers:{
        replaceApointments(state, action){
            state.appointments = action.payload.data;
            state.availableAppointments = action.payload.availableAppointments;
            state.appointmentCount = action.payload.appointmentCount;
            state.isLoading = false
            state.next = action.payload.next;
            state.previous = action.payload.previous;
        },
        // getcategories(state,action){
        //     state.categories = action.payload.categories;
        //     state.isLoading = action.payload.isLoading;
        // }
    }
})

export const doctorActions = doctorSlice.actions
export default doctorSlice;