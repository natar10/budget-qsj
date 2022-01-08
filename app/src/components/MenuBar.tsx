import { t } from "i18next";
import React from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";

const MenuBar: React.FC = () => {
  const { t } = useTranslation("es");
  return (
    <div className="menu-bar">
      <Link to="/">
        <h1>Quinta San Joaquin</h1>
      </Link>
      <Link className="menu-item" to="/menu">
        {t("menu")}
      </Link>
      <Link className="menu-item" to="/decoration">
        {t("decoration")}
      </Link>
      <Link className="menu-item" to="/services">
        {t("services")}
      </Link>
      <Link className="menu-item" to="/reception">
        {t("reception")}
      </Link>
    </div>
  );
};

export default MenuBar;
