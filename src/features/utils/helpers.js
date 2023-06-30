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

export const helpers ={
    convertTimeTo12HourFormat,
}