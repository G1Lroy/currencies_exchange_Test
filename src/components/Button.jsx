import React from "react";
import "./Button.css";
import clear from "./../assets/clearLogo.svg";

const Button = ({ onClick }) => {
  return (
    <div className="reset-button" onClick={onClick}>
      <img src={clear} alt="clear ico" />
    </div>
  );
};

export default Button;
