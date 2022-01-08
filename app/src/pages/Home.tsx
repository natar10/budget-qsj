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
        <hr />
        <h4>{t("several_options")}</h4>
        <h4>{t("navigate")}</h4>
        <hr />
        <h2>{t("start")}</h2>
        <div className="start-buttons">
          <Link className="btn btn-success btn-xlg" to="menu">
            {t("base_option")}
          </Link>
        </div>
      </UserDataController>
    </div>
  );
};

export default Home;
