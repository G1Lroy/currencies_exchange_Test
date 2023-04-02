import React from "react";

const Select = ({ currencies, onChange, disableOption, value, name }) => {
  return (
    <select value={value} onChange={onChange} name={name}>
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
