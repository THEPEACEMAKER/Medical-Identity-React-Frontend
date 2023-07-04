import { Select } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import api from "../../../../api/api";
import CheckoutButton from "./CheckoutButton";

const BookAppointment = ({ doctorID }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get(
          `/appointment/patient/doctor/${doctorID}/available/`
        );
        setAppointments(response.data.result);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [doctorID]);

  useEffect(() => {
    const filterAppointmentsByDate = () => {
      const availableDates = appointments.reduce((dates, appointment) => {
        const appointmentDate = moment(appointment.date).format("YYYY-MM-DD");
        if (!dates.includes(appointmentDate)) {
          dates.push(appointmentDate);
        }
        return dates;
      }, []);
      setDates(availableDates);
    };

    filterAppointmentsByDate();
  }, [appointments]);

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleTimeChange = (value) => {
    setSelectedAppointment(value);
  };

  return (
    <>
      <div>
        <Select
          style={{
            width: "100%",
          }}
          className="date-select"
          defaultValue={null}
          placeholder="Select a Date"
          placement="bottomRight"
          onChange={handleDateChange}
          options={dates.map((date) => ({
            label: moment(date).format("MMM DD, YYYY"),
            value: date,
          }))}
        />
      </div>
      {selectedDate && (
        <div>
          <Select
            style={{
              width: "100%",
            }}
            className="time-select mt-2"
            placeholder="Select a Time | Price"
            options={appointments
              .filter((appointment) => appointment.date === selectedDate)
              .map((appointment) => ({
                label: `${moment(appointment.start_time, "HH:mm:ss").format(
                  "hh:mm A"
                )} (£${appointment.price})`,
                value: appointment.id,
              }))}
            onChange={handleTimeChange}
          />
        </div>
      )}
      <div className="mt-2">
        <CheckoutButton
          appointmentId={selectedAppointment}
          hasAppointments={appointments.length}
        />
      </div>
    </>
  );
};

export default BookAppointment;
