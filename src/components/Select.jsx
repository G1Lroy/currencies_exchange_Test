import React from "react";
import "./Select.css";

const Select = ({ currencies, onChange, disableOption, value, name }) => {
  return (
    <select
      className="user-select"
      value={value}
      onChange={onChange}
      name={name}
    >
      {currencies.map((item) => (
        <option
          value={item.cc}
          key={item.cc}
          disabled={item.cc === disableOption}
        >
          {item.cc}
        </option>
      ))}
    </select>
  );
};

export default Select;
