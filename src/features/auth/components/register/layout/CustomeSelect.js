import { useEffect, useState } from "react";
import { Select } from "antd";
import api from "../../../../../api/api";
import styles from "../stylee.module.css";

const CustomeSelect = ({ value, onChange, onBlur, error }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await api.get("specilaizations");
        // const data = response.data;
        const data = [
          {
            value: "Dentistry",
            label: "Dentistry",
          },
          {
            value: "Cardiology",
            label: "Cardiology",
          },
          {
            value: "Forensic",
            label: "Forensic",
          },
        ];
        setOptions(data);
      } catch (error) {
        console.error("Error fetching specilaizations:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Select
      id="specialization"
      showSearch
      placeholder="Select a specilaization"
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      value={value ? value : null}
      onChange={(value) => onChange("specialization", value)}
      onBlur={() => onBlur("specialization", true)}
      className={`w-100 ${error ? styles.inputErr : ""}`}
      size="large"
    />
  );
};

export default CustomeSelect;
