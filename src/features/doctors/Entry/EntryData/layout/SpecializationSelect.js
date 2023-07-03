import { useEffect, useState } from "react";
import { Select } from "antd";
import api from "../../../../../api/api";

const SpecializationSelect = ({ onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("specializations");
        const data = response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setOptions([{ value: "All", label: "All" }, ...data]);
      } catch (error) {
        console.error("Error fetching specializations:", error);
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
      onChange={(value) => onChange(value)}
      className={`w-100`}
      size="large"
    />
  );
};

export default SpecializationSelect;
