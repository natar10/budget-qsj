import React from "react";
import { Props } from "../common/types";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import UserDataController from "../components/UserDataController";

const Home: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  return (
    <UserDataController>
      <h1>Home</h1>
      <Link to="menu">Select menu</Link>
    </UserDataController>
  );
};

export default Home;
