import React from "react";
import { Props } from "../common/types";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import UserDataController from "../components/UserDataController";
import { useAppContext } from "../context/AppContext";

const Home: React.FC<Props> = (props) => {
  const { userData } = useAppContext();
  const { t } = useTranslation("es");
  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        <h1>Home</h1>
        <Link to="menu">Select menu</Link>
      </UserDataController>
    </div>
  );
};

export default Home;
