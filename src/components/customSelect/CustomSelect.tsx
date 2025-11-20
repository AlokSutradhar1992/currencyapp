import React from "react";
import Select from "react-select";

interface CustomSelectProps {
  options: { value: string; label: React.ReactNode }[];
  value: { value: string; label: React.ReactNode } | null;
  onChange: (selectedOption: any) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CustomSelect;
