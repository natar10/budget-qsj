import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { isItemSelected } from "../common/functions";
import { Menu, Props, Additional } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { menus } from "../services/contentful";
import { Link, useParams } from "@reach/router";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import GooglePhotos from "../components/GooglePhotos";

type Params = {
  menuId: string;
};

const MenuOption: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const { selectUniqueItems, selectedUniqueItems, contentfulClient, userData } =
    useAppContext();
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
      .catch((e) => console.log(e));
  }, [menuId, userData]);

  const selectMenu = (value: number, item: string) => {
    if (!selectUniqueItems) return;
    selectUniqueItems({ type: "menu", value, item });
  };

  return (
    <UserDataController>
      {menu ? (
        <>
          <h2 className="mb-4">{menu.title}</h2>
          <Row>
            <Col md={8}>
              <div>
                {description?.text && description?.text2 && description?.text3 && (
                  <>
                    <h3 className="mb-4">{description.title}</h3>
                    <Row>
                      <Col>
                        <ReactMarkdown>{description.text}</ReactMarkdown>
                      </Col>
                      <Col>
                        <ReactMarkdown>{description.text2}</ReactMarkdown>
                      </Col>
                      <Col>
                        <ReactMarkdown>{description.text3}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            </Col>
            <Col className="text-center">
              <h1>${menu.value}</h1>
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
                {isItemSelected(menu.id, selectedUniqueItems) ? (
                  <>
                    <h3>{t("selected")}</h3>
                    <Link
                      to="/decoration"
                      className="d-block btn btn-success btn-lg"
                    >
                      {t("continue_decoration")}
                    </Link>
                  </>
                ) : (
                  <Button
                    className="d-block"
                    onClick={() => selectMenu(menu.value, menu.id)}
                    variant="success"
                    size="lg"
                  >
                    {t("select")}
                  </Button>
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
              <Col className="option">
                <ReactMarkdown>{menu.option1}</ReactMarkdown>
              </Col>
              <Col className="option">
                <ReactMarkdown>{menu.option2}</ReactMarkdown>
              </Col>
              <Col className="option">
                <ReactMarkdown>{menu.option3}</ReactMarkdown>
              </Col>
            </Row>
          )}
          <h3 id="menu_photos" className="mb-5 mt-3">
            {t("menu_photos")}
          </h3>
          <GooglePhotos albumId={menu.photosUrl} />
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </UserDataController>
  );
};

export default MenuOption;
