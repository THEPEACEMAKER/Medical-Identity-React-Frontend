import { Select } from "antd";
import { useState, useEffect } from "react";
import api from "../../../../../api/api";

const PlaceSelect = ({ value, onChange, onBlur, error }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("city/list-all/");
        const data = response.data;
        setCities(data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (value.city_id) {
      const selectedCityData = cities.find((city) => city.id === value.city_id);
      const districts = selectedCityData?.districts || [];
      const defaultDistrict = districts[0]?.id || "";
      setDistricts(districts);
      setSelectedCity(value.city_id);
      setSelectedDistrict(value.district_id || defaultDistrict);
    }
  }, [value.city_id, value.district_id, cities]);

  const handleCityChange = (value) => {
    const selectedCityData = cities.find((city) => city.id === value);
    const districts = selectedCityData?.districts || [];
    const defaultDistrict = districts[0]?.id || "";
    setDistricts(districts);
    setSelectedCity(value);
    setSelectedDistrict(defaultDistrict);
    onChange("city_id", value);
    onChange("district_id", defaultDistrict);
    onBlur("city_id", true);
    onBlur("district_id", true);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    onChange("district_id", value);
    onBlur("district_id", true);
  };

  return (
    <div className="w-100 position-relative d-flex justify-content-between mb-3">
      <Select
        defaultValue={value.city_id || null}
        placeholder="Select a City"
        style={{
          flex: 1,
          marginRight: "0.5rem",
        }}
        onChange={handleCityChange}
        onBlur={() => onBlur("city_id", true)}
        options={cities.map((city) => ({
          label: city.name_en,
          value: city.id,
        }))}
        size="large"
      />
      <Select
        style={{
          flex: 1,
          marginLeft: "0.5rem",
        }}
        value={selectedDistrict || null}
        placeholder="Select a Distrect"
        onChange={handleDistrictChange}
        onBlur={() => onBlur("district_id", true)}
        options={districts.map((district) => ({
          label: district.name_en,
          value: district.id,
        }))}
        size="large"
      />
    </div>
  );
};

export default PlaceSelect;
