import React, { useEffect, useState } from "react";
import { Props, Decoration } from "../common/types";
import { Link } from "@reach/router";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { decorations } from "../services/contentful";
import { isItemSelected, isCategorySelected } from "../common/functions";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Loading } from "../components/Loading";

const CeremonyDecoration: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const [allDecorations, setAllDecorations] = useState<Decoration[]>([]);
  const { contentfulClient, userData, selectedUniqueItems } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!contentfulClient) return;
    decorations
      .getDecorations(contentfulClient, "ceremony")
      .then((allDecorations) => setAllDecorations(allDecorations))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [userData]);

  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        <h1>{t("ceremony_decoration")}</h1>
        {isLoading && <Loading />}
        {isCategorySelected("ceremony", selectedUniqueItems) && (
          <h3>{t("ceremony_selected")}</h3>
        )}
        <hr />
        <h4>{t("can_choose_ceremony")}</h4>
        <h4>{t("skip_ceremony")}:</h4>
        <Link className="btn btn-warning btn-lg mt-3" to={`/services/`}>
          {t("continue_services")}
        </Link>
        <hr />
        <Row>
          {allDecorations.map((decoration) => (
            <Col sm={12} md={4} key={decoration.id}>
              <div className="option">
                <h3>{decoration.title}</h3>
                <Link className="mt-3" to={`/ceremony/${decoration.id}`}>
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
                  to={`/ceremony/${decoration.id}`}
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

export default CeremonyDecoration;
