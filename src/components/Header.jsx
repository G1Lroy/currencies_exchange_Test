import React from "react";
import "./Header.css";
import Loader from "./Loader";
import euImg from "./../assets/eu.svg";
import gbpImg from "./../assets/gbp.svg";
import usaImg from "./../assets/usa.svg";

const Header = ({ load, currencies }) => {
  const currImg = {
    EUR: euImg,
    GBP: gbpImg,
    USD: usaImg,
  };
  if (load) {
    return <Loader />;
  }
  return (
    <div className="header">
      <h1 className="header__title">Currencies exchage</h1>
      {currencies.map((item) =>
        item.cc !== "UAH" ? (
          <ul className="header__currency-list" key={item.cc}>
            <li className="header__currency-icon">
              <img src={currImg[item.cc]} alt={item.cc} />
            </li>
            <li className="header__currency-name">{item.cc}:</li>
            <li className="header__currency-rate"> {item.rate.toFixed(2)} </li>
          </ul>
        ) : null
      )}
    </div>
  );
};

export default Header;
