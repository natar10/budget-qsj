import React from "react";
import { Props } from "../common/types";
import { Link } from "@reach/router";
import UserDataController from "../components/UserDataController";

const Service: React.FC<Props> = (props) => {
  return (
    <UserDataController>
      <h1>Servicios</h1>
      <Link to="/services/1">Service 1</Link>
      <Link to="/services/2">Service 2</Link>
      <Link to="/services/3">Service 3</Link>
    </UserDataController>
  );
};

export default Service;
