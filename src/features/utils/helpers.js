import api from "../../api/api";
import { useDispatch } from "react-redux";
import { doctorActions } from "../../store/doctor/doctor-slice";





function convertTimeTo12HourFormat(timeStr) {
    // Create a Date object with the time string
    const dateObj = new Date(`2000-01-01T${timeStr}`);
  
    // Get the hours and minutes from the Date object
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
  
    // Determine if the time is AM or PM
    let amOrPm = hours < 12 ? "AM" : "PM";
  
    // Convert hours to 12-hour format
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
  
    // Pad the minutes with a leading zero if necessary
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    // Construct the new time string in 12-hour format
    const time12Hour = `${hours}:${minutes} ${amOrPm}`;
  
    return time12Hour;
}

function fetchDoctorData (dispatch) {
  
  const endpoint1 = "/appointment/doctor/list-all/";
  const endpoint2 = "/appointment/doctor/list/count/status/";
  const endpoint3 = "/appointment/doctor/list/available/";
  const endpoint4 = "/appointment/doctor/list/reserved/";
  
  Promise.all([
    api.get(endpoint1),
    api.get(endpoint2),
    api.get(endpoint3),
    api.get(endpoint4)
  ])
    .then(([appointmentsRes, countRes, availableResponse, reservedResponse]) => {
      const appointments = appointmentsRes.data || [];
      const count = countRes.data || 0;
      const availabelAppoint = availableResponse.data || [];
      const reservedAppoint = reservedResponse.data || [];
  
      console.log("inside api")
      console.log(appointments, count);

      console.log("available in api")
      console.log(availabelAppoint)

      console.log("reserved in api")
      console.log(reservedAppoint)

      const available = appointments.result.filter((appoint)=> appoint.status === "A")

      console.log(appointments.result)
      console.log(available)

      console.log("available")
      console.log(available)

      dispatch(doctorActions.replaceApointments({
        data: appointments.result,
        appointmentCount: count,
        reservedAppointment: reservedAppoint.result,
        availableAppointments:availabelAppoint.result,
        isLoading : false,
      }));
    })
    .catch((error) => {
      console.error(error);
    });
}


export const helpers ={
    convertTimeTo12HourFormat,
    fetchDoctorData
}