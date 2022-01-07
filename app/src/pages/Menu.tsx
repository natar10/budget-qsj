import React, { useEffect, useState } from "react";
import { Props, Menu } from "../common/types";
import { Link } from "@reach/router";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { menus } from "../services/contentful";
import { isItemSelected, isCategorySelected } from "../common/functions";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Menu: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const [allMenus, setAllMenus] = useState<Menu[]>([]);
  const { contentfulClient, userData, selectedUniqueItems } = useAppContext();
  useEffect(() => {
    if (!contentfulClient) return;
    menus
      .getMenus(contentfulClient, "menu")
      .then((allMenus) => setAllMenus(allMenus))
      .catch((e) => console.log(e));
  }, [userData]);
  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        <h2>{t("select_menu")}:</h2>
        {isCategorySelected("menu", selectedUniqueItems) && (
          <h3>{t("menu_selected")}</h3>
        )}
        <Row>
          {allMenus.map((menu) => (
            <Col className="option" key={menu.id}>
              <h3>{menu.title}</h3>
              <Link
                className="btn btn-secondary btn-lg mt-3"
                to={`/menu/${menu.id}`}
              >
                <img
                  width="100%"
                  src={menu.mainPhoto.fields.file.url}
                  alt={menu.title}
                />
              </Link>
              {isItemSelected(menu.id, selectedUniqueItems) && (
                <p>{t("chosen")}</p>
              )}
              <Link
                className="btn btn-secondary btn-lg mt-3"
                to={`/menu/${menu.id}`}
              >
                {t("see_options")}
              </Link>
            </Col>
          ))}
        </Row>
      </UserDataController>
    </div>
  );
};

export default Menu;
