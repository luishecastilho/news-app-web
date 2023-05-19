import React from "react";
import loading from "../Images/loading.gif";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner">
      <img src={loading} alt="loading" />
    </div>
  );
}

export default Spinner;