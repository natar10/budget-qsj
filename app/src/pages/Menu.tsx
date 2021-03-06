import React, { useEffect, useState } from "react";
import { Props, Menu } from "../common/types";
import { Link } from "@reach/router";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { menus } from "../services/contentful";
import { isItemSelected, isCategorySelected } from "../common/functions";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Loading } from "../components/Loading";

const Menu: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const [allMenus, setAllMenus] = useState<Menu[]>([]);
  const { contentfulClient, userData, selectedUniqueItems } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!contentfulClient) return;
    menus
      .getMenus(contentfulClient, "menu")
      .then((allMenus) => setAllMenus(allMenus))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [userData]);
  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        <h2>{t("select_menu")}:</h2>
        {isLoading && <Loading />}
        {isCategorySelected("menu", selectedUniqueItems) && (
          <h3>{t("menu_selected")}</h3>
        )}
        <Row>
          {allMenus.map((menu) => (
            <Col
              sm={12}
              md={{ span: 5, offset: 1 }}
              className="ml-1"
              key={menu.id}
            >
              <div className="option">
                <h3>{menu.title}</h3>
                <p>{menu.description} </p>
                <Link className="mt-3" to={`/menu/${menu.id}`}>
                  <img
                    width="90%"
                    src={menu.mainPhoto.fields.file.url}
                    alt={menu.title}
                  />
                </Link>
                {isItemSelected(menu.id, selectedUniqueItems) && (
                  <h4 className="mt-3">{t("chosen")}</h4>
                )}
                <Link
                  className="btn btn-success btn-lg mt-3"
                  to={`/menu/${menu.id}`}
                >
                  {t("see_options")}
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </UserDataController>
    </div>
  );
};

export default Menu;
