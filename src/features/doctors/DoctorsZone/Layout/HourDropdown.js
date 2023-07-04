import React, { useState, useEffect } from "react";
import api from "../../../../api/api";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

const HourDropdown = ({ selectedHour, handleHourSelect, fullDate }) => {
  const [hours, setHours] = useState([
    { id: 1, label: "9:00:00" },
    { id: 2, label: "10:00:00" },
    { id: 3, label: "11:00:00" },
    { id: 4, label: "12:00:00" },
    { id: 5, label: "13:00:00" },
    { id: 6, label: "14:00:00" },
    { id: 7, label: "15:00:00" },
    { id: 8, label: "16:00:00" },
    { id: 9, label: "17:00:00" },
    { id: 10, label: "18:00:00" },
    { id: 11, label: "19:00:00" },
    { id: 12, label: "20:00:00" },
    { id: 13, label: "21:00:00" },
    { id: 14, label: "22:00:00" },
    { id: 15, label: "23:00:00" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/appointment/doctor/list/date/${fullDate}/`
        );
        const startTimes = response.data.result.map(
          (result) => result.start_time
        );

        const filteredHours = hours.filter(
          (hour) => !startTimes.includes(hour.label)
        );

        setHours(filteredHours);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fullDate]);

  return (
    <MDBDropdown>
      <MDBDropdownToggle type="button">
        {selectedHour ? selectedHour.label : "Select an hour"}
      </MDBDropdownToggle>
      <MDBDropdownMenu type="dropdown">
        {hours.map((hour) => (
          <MDBDropdownItem key={hour.id} onClick={() => handleHourSelect(hour)}>
            {hour.label}
          </MDBDropdownItem>
        ))}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default HourDropdown;
