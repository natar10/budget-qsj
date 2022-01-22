import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { isItemSelected } from "../common/functions";
import { Menu, Props, Additional, SelectedItem } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { menus } from "../services/contentful";
import { Link, useParams } from "@reach/router";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import GooglePhotos from "../components/GooglePhotos";
import { Loading } from "../components/Loading";

type Params = {
  menuId: string;
};

const MenuOption: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const { selectUniqueItems, selectedUniqueItems, contentfulClient, userData } =
    useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [description, setDescription] = useState<Additional | undefined>(
    undefined
  );
  const { menuId } = useParams<Params>();

  useEffect(() => {
    if (!contentfulClient || !menuId) return;
    menus
      .getMenu(contentfulClient, menuId)
      .then((menuItem: Menu) => setMenu(menuItem))
      .then(() => menus.getMenu(contentfulClient, "2VkJfNDy2gTZaAG1wLvxF0"))
      .then((descriptionItem: Menu) => setDescription(descriptionItem))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [menuId, userData]);

  const selectMenu = (product: Menu) => {
    if (!selectUniqueItems) return;
    selectUniqueItems({ type: "menu", product });
  };

  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        {isLoading && <Loading />}
        {menu && (
          <>
            <h2 className="mb-4">{menu.title}</h2>
            <Row>
              <Col className="includes" sm={12} md={9}>
                <div>
                  {description?.text &&
                    description?.text2 &&
                    description?.text3 && (
                      <>
                        <h3 className="mb-4">{description.title}</h3>
                        <Row>
                          <Col sm={12} md={4}>
                            <ReactMarkdown>{description.text}</ReactMarkdown>
                          </Col>
                          <Col sm={12} md={4}>
                            <ReactMarkdown>{description.text2}</ReactMarkdown>
                          </Col>
                          <Col sm={12} md={4}>
                            <ReactMarkdown>{description.text3}</ReactMarkdown>
                          </Col>
                        </Row>
                      </>
                    )}
                </div>
              </Col>
              <Col className="text-center" sm={12} md={3}>
                <h1>${menu.value}pp</h1>
                <a
                  href="#menu_options"
                  className="m-2 btn btn-outline-success btn-lg m-2"
                >
                  {t("see_menus")}
                </a>
                <a
                  href="#menu_photos"
                  className="m-2 btn btn-outline-primary btn-lg m-2"
                >
                  {t("see_photos")}
                </a>

                <div className="d-grid gap-2">
                  {!isItemSelected(menu.id, selectedUniqueItems) ? (
                    <Button
                      className="d-block"
                      onClick={() => selectMenu(menu)}
                      variant="success"
                      size="lg"
                    >
                      {t("select")}
                    </Button>
                  ) : (
                    <h3>{t("selected")}</h3>
                  )}
                  {isItemSelected(menu.id, selectedUniqueItems) && (
                    <Link
                      to="/decoration"
                      className="d-block btn btn-warning btn-lg"
                    >
                      {t("continue_decoration")}
                    </Link>
                  )}
                  <Link
                    to="/menu"
                    className="d-block btn btn-outline-secondary btn-lg"
                  >
                    {t("more_options")}
                  </Link>
                </div>
              </Col>
            </Row>
            <h3 id="menu_options" className="mb-5 mt-3">
              {t("menu_options")}
            </h3>
            {menu.option1 && menu.option2 && menu.option3 && (
              <Row>
                <Col sm={12} md={4}>
                  <div className="option">
                    <ReactMarkdown>{menu.option1}</ReactMarkdown>
                  </div>
                </Col>
                <Col sm={12} md={4}>
                  <div className="option">
                    <ReactMarkdown>{menu.option2}</ReactMarkdown>
                  </div>
                </Col>
                <Col sm={12} md={4}>
                  <div className="option">
                    <ReactMarkdown>{menu.option3}</ReactMarkdown>
                  </div>
                </Col>
              </Row>
            )}
            <h3 id="menu_photos" className="mb-5 mt-3">
              {t("menu_photos")}
            </h3>
            <GooglePhotos albumId={menu.photosUrl} />
          </>
        )}
      </UserDataController>
    </div>
  );
};

export default MenuOption;
