import React from "react";
import { Link } from "react-router-dom";

const ReturnPage = () => {
  return (
    <div>
      <div>ReturnPage12</div>
      <button onClick={() => console.log("hello")}>Hello</button>
      <div>This is the return page</div>
    </div>
  );
};

export default ReturnPage;