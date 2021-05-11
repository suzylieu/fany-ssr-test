import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import apis from '../../redux/apis';

const ThirtyHF = () => {

  useEffect(() => {
    apis.fetachGetCampList()
  }, []);

  return (
    <div>abc</div>
  );
};

export default ThirtyHF;