import React, { useEffect, useState } from "react";
import { Props, Decoration } from "../common/types";
import { Link } from "@reach/router";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { decorations } from "../services/contentful";
import { isItemSelected, isCategorySelected } from "../common/functions";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Decoration: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const [allDecorations, setAllDecorations] = useState<Decoration[]>([]);
  const { contentfulClient, userData, selectedUniqueItems } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!contentfulClient) return;
    decorations
      .getDecorations(contentfulClient, "decoration")
      .then((allDecorations) => setAllDecorations(allDecorations))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [userData]);
  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        <h1>{t("decoration")}</h1>
        {isLoading && <h2 className="mt-3">{t("loading")}</h2>}
        {isCategorySelected("decoration", selectedUniqueItems) && (
          <h3>{t("decoration_selected")}</h3>
        )}
        <Row>
          {allDecorations.map((decoration) => (
            <Col className="option" key={decoration.id}>
              <h3>{decoration.title}</h3>
              <Link className="mt-3" to={`/decoration/${decoration.id}`}>
                <img
                  width="90%"
                  src={decoration.mainPhoto.fields.file.url}
                  alt={decoration.title}
                />
              </Link>
              {isItemSelected(decoration.id, selectedUniqueItems) && (
                <p>{t("chosen")}</p>
              )}
              <Link
                className="btn btn-success btn-lg mt-3"
                to={`/decoration/${decoration.id}`}
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

export default Decoration;
