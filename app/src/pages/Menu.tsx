import React from "react";
import { Props } from "../common/types";
import { Link } from "@reach/router";
import UserDataController from "../components/UserDataController";

const Menu: React.FC<Props> = (props) => {
  return (
    <UserDataController>
      <h1>Menu</h1>
      <Link to="/menu/1">Menu 1</Link>
      <Link to="/menu/2">Menu 2</Link>
      <Link to="/menu/3">Menu 3</Link>
    </UserDataController>
  );
};

export default Menu;
