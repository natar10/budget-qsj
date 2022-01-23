import React from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t } = useTranslation("es");
  return (
    <>
      <Link to="/home">{t("home")}</Link>
      <Link to="menu">{t("menu")}</Link>
      <Link to="decoration">{t("decoration")}</Link>
      <Link to="services">{t("services")}</Link>
      <Link to="reception">{t("reception")}</Link>
    </>
  );
};

export default App;
