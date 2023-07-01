import { Select } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import api from "../../../../api/api";
import CheckoutButton from "./CheckoutButton";

const BookAppointment = ({ doctorID }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const datesAfterToday = [];
        for (let i = 0; i < 7; i++) {
          const date = moment().add(i, "days").format("YYYY-MM-DD");
          datesAfterToday.push(date);
        }
        setDates(datesAfterToday);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchDates();
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      filterAppointmentsByDate();
    }
  }, [selectedDate]);

  const handleDateChange = (value) => {
    setSelectedDate(value);
    filterAppointmentsByDate();
  };

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

  const filterAppointmentsByDate = () => {
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.date === selectedDate
    );
    setAppointmentsByDate(filteredAppointments);
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
      <div>
        <Select
          style={{
            width: "100%",
          }}
          className="time-select mt-2"
          placeholder="Select a Time | Price"
          options={appointmentsByDate.map((appointment) => ({
            label: `${moment(appointment.start_time, "HH:mm:ss").format(
              "hh:mm A"
            )} (£${appointment.price})`,
            value: appointment.id,
          }))}
          disabled={!appointmentsByDate.length}
          onChange={handleTimeChange}
        />
      </div>
      <div className="mt-2">
        <CheckoutButton appointmentId={selectedAppointment} />
      </div>
    </>
  );
};

export default BookAppointment;
