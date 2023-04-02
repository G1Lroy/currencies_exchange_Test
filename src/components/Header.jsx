import React from "react";

const Header = ({load, currencies}) => {
  return (
    <div>
      {load ? (
        <div>Loading...</div>
      ) : (
        currencies.map((item) => (
          <div hidden={item.cc === "UAH"} key={item.cc}>
            <span>{item.txt}</span>_
            <span>{item.rate}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Header;
