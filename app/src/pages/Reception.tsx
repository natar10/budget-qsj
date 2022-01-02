import React from "react";
import { Props } from "../common/types";
import { Link } from "@reach/router";
import UserDataController from "../components/UserDataController";

const Reception: React.FC<Props> = (props) => {
  return (
    <UserDataController>
      <h1>Recepcion</h1>
      <Link to="/reception/1">Reception 1</Link>
      <Link to="/reception/2">Reception 2</Link>
      <Link to="/reception/3">Reception 3</Link>
    </UserDataController>
  );
};

export default Reception;
