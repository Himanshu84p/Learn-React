import React from "react";
import AppLogo from "../assets/appLogo.png";

function Logo({ width = "5px" }) {
  return (
    <div>
      <img width={width} src={AppLogo} alt="Logo" />
    </div>
  );
}

export default Logo;
