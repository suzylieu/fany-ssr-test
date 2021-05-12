import React from "react";
import { useDispatch, useSelector } from 'react-redux';

const ReturnPage = (props, context) => {
  const state = useSelector(state => state);
  console.log('\x1b[35m props::', props);
  return (
    <div>
      <div>ReturnPage12</div>
      <button onClick={() => console.log("hello")}>Hello</button>
      <div>This is the return page</div>
    </div>
  );
};

export default ReturnPage;