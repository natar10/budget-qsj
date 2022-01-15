import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { calculateTotal, isItemSelected } from "../common/functions";
import { Decoration, Props, Additional } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { decorations } from "../services/contentful";
import { Link, useParams } from "@reach/router";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import GooglePhotos from "../components/GooglePhotos";

type Params = {
  decorationId: string;
};

const DecorationOption: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const { selectUniqueItems, selectedUniqueItems, contentfulClient, userData } =
    useAppContext();
  const [decoration, setDecoration] = useState<Decoration | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { decorationId } = useParams<Params>();

  useEffect(() => {
    if (!contentfulClient || !decorationId) return;
    decorations
      .getDecoration(contentfulClient, decorationId)
      .then((decorationItem: Decoration) => setDecoration(decorationItem))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [decorationId, userData]);

  const selectDecoration = (product: Decoration) => {
    if (!selectUniqueItems) return;
    selectUniqueItems({ type: "decoration", product });
  };

  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        {isLoading && <h2 className="mt-3">{t("loading")}</h2>}
        {decoration && (
          <>
            <h2 className="mb-4">{decoration.title}</h2>
            <Row>
              <Col md={8}>
                <h2>{t("included_decoration")}</h2>
                <Row>
                  <Col sm={12} md={4} className="decoration">
                    <ReactMarkdown>{decoration.banquet}</ReactMarkdown>
                  </Col>
                  <Col sm={12} md={4} className="decoration">
                    <ReactMarkdown>{decoration.exterior}</ReactMarkdown>
                  </Col>
                  <Col sm={12} md={4} className="decoration">
                    <ReactMarkdown>{decoration.ceremony}</ReactMarkdown>
                  </Col>
                </Row>
                <hr />
                <ReactMarkdown>{decoration.description}</ReactMarkdown>
                <hr />
              </Col>
              <Col className="text-center">
                <h1>
                  $
                  {userData &&
                    calculateTotal(
                      { type: "decoration", product: decoration },
                      +userData.quantity
                    )}
                </h1>
                <div className="d-grid gap-2">
                  <a
                    href="#decoration_photos"
                    className="m-2 btn btn-outline-primary btn-lg m-2"
                  >
                    {t("see_photos")}
                  </a>
                  {!isItemSelected(decoration.id, selectedUniqueItems) ? (
                    <Button
                      className="d-block"
                      onClick={() => selectDecoration(decoration)}
                      variant="success"
                      size="lg"
                    >
                      {t("select")}
                    </Button>
                  ) : (
                    <h3>{t("selected")}</h3>
                  )}
                  {isItemSelected(decoration.id, selectedUniqueItems) && (
                    <Link
                      to="/services"
                      className="d-block btn btn-warning btn-lg"
                    >
                      {t("continue_services")}
                    </Link>
                  )}

                  <Link
                    to="/decoration"
                    className="d-block btn btn-outline-secondary btn-lg"
                  >
                    {t("more_options")}
                  </Link>
                </div>
              </Col>
            </Row>
            <h3 id="decoration_photos" className="mb-5 mt-3">
              {t("decoration_photos")}
            </h3>
            <GooglePhotos albumId={decoration.photosUrl} />
          </>
        )}
      </UserDataController>
    </div>
  );
};

export default DecorationOption;
