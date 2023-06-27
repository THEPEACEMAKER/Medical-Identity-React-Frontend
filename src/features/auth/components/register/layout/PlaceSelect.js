import { Select, Space } from "antd";
import { useState } from "react";

const cityData = ["Cairo", "Giza"];
const districtData = {
  Cairo: ["Maadi", "Azbakeya", "Abbassia"],
  Giza: ["Agouza", "Duqqi", "Warraq"],
};

const PlaceSelect = ({ value, onChange, onBlur, error }) => {
  const [cities, setCities] = useState(districtData[cityData[0]]);
  const [district, setDistrict] = useState(districtData[cityData[0]][0]);

  const handleProvinceChange = (value) => {
    setCities(districtData[value]);
    setDistrict(districtData[value][0]);
    onChange("city", value);
    onChange("district", districtData[value][0]);
    onBlur("city", true);
    onBlur("district", true);
  };

  const onDistrictChange = (value) => {
    setDistrict(value);
    onChange("district", value);
    onBlur("district", true);
  };

  return (
    <>
      <div className="w-100 position-relative d-flex justify-content-between">
        <Select
          defaultValue={value.city || cityData[0]}
          style={{
            flex: 1,
            marginRight: "0.5rem",
          }}
          onChange={handleProvinceChange}
          onBlur={() => onBlur("city", true)}
          options={cityData.map((province) => ({
            label: province,
            value: province,
          }))}
          size="large"
        />
        <Select
          style={{
            flex: 1,
            marginLeft: "0.5rem",
          }}
          value={value.district || district}
          onChange={onDistrictChange}
          onBlur={() => onBlur("district", true)}
          options={cities.map((city) => ({
            label: city,
            value: city,
          }))}
          size="large"
        />
      </div>
    </>
  );
};

export default PlaceSelect;
