import React from "react";
import { Props } from "../common/types";
import { Link } from "@reach/router";
import UserDataController from "../components/UserDataController";

const Decoration: React.FC<Props> = (props) => {
  return (
    <UserDataController>
      <h1>Decoracion</h1>
      <Link to="/decoration/1">Opcion de Decoracion 1</Link>
      <Link to="/decoration/2">Opcion de Decoracion 2</Link>
      <Link to="/decoration/3">Opcion de Decoracion 3</Link>
    </UserDataController>
  );
};

export default Decoration;
