import React from "react";
import { Props } from "../common/types";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import UserDataController from "../components/UserDataController";
import { useAppContext } from "../context/AppContext";

const Home: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const { userData } = useAppContext();
  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        <h1>{t("welcome")}</h1>
        <h3>{t("calculate_budget")}</h3>
        <h4>{t("several_options")}</h4>
        <h4>{t("navigate")}</h4>
        <h3>{t("start")}</h3>
        <div className="start-buttons">
          <Link className="btn btn-outline-success btn-lg" to="menu">
            {t("menu")}
          </Link>
          <Link className="btn btn-outline-primary btn-lg" to="decoration">
            {t("decoration")}
          </Link>
          <Link className="btn btn-outline-warning btn-lg" to="services">
            {t("services")}
          </Link>
          <Link className="btn btn-outline-dark btn-lg" to="reception">
            {t("reception")}
          </Link>
        </div>
      </UserDataController>
    </div>
  );
};

export default Home;
