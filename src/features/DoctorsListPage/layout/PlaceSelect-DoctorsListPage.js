import { Select, Space } from "antd";
import { useState, useEffect } from "react";
import api from "../../../api/api";

const PlaceSelect_DoctorsListPage = ({
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
}) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("city/list-all/");
        const data = response.data.map((city) => ({
          label: city.name_en,
          value: city.id,
          districts: [{ id: "All", name_en: "All" }, ...city.districts],
        }));
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (value) => {
    setSelectedCity(value);
    const selectedCityData = cities.find((city) => city.value === value);
    if (selectedCityData) {
      setDistricts(selectedCityData.districts);
      setSelectedDistrict(null);
    }
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-3">
          <Space>
            <span className="find-doctors-text">Find doctors near you:</span>
            <Select
              style={{
                flex: 1,
                marginRight: "0.5rem",
                width: "200px",
              }}
              className="city-select"
              defaultValue={null}
              placeholder="Select a City"
              onChange={handleCityChange}
              options={cities.map((city) => ({
                label: city.label,
                value: city.value,
              }))}
              size="large"
            />
            <Select
              style={{
                flex: 1,
                marginLeft: "0.5rem",
                width: "200px",
              }}
              className="district-select"
              placeholder="Select a District"
              onChange={handleDistrictChange}
              options={districts.map((district) => ({
                label: district.name_en,
                value: district.id,
              }))}
              value={selectedDistrict}
              size="large"
            />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default PlaceSelect_DoctorsListPage;
