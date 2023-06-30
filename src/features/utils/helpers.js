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
  
  Promise.all([
    api.get(endpoint1),
    api.get(endpoint2),
  ])
    .then(([appointmentsRes, countRes]) => {
      const appointments = appointmentsRes.data || [];
      const count = countRes.data || 0;
  
      console.log("inside app")
      console.log(appointments, count);
      dispatch(doctorActions.replaceApointments({
        data: appointments.result,
        appointmentCount: count,
        availableAppointments:appointments.result,
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