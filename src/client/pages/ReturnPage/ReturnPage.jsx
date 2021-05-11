import React from "react";
import { Link } from "react-router-dom";

const ReturnPage = () => {
  return (
    <div>
      <div>ReturnPage12</div>
      <button onClick={() => console.log("hello")}>Hello</button>
      <div>
        <Link to="/hfPage">To HF page</Link>
      </div>
    </div>
  );
};

export default ReturnPage;