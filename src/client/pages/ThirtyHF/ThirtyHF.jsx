import React from "react";
import { Link } from "react-router-dom";

const ThirtyHF = () => {
  return (
    <div>
      <div>ThirtyHFpage12</div>
      <button onClick={() => console.log("click me")}>click me</button>
      <div>
        <Link to="/return">To Return page</Link>
      </div>
    </div>
  );
};

export default ThirtyHF;