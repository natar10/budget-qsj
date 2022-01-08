import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { isItemSelected } from "../common/functions";
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
  const { decorationId } = useParams<Params>();

  useEffect(() => {
    if (!contentfulClient || !decorationId) return;
    decorations
      .getDecoration(contentfulClient, decorationId)
      .then((decorationItem: Decoration) => setDecoration(decorationItem))
      .catch((e) => console.log(e));
  }, [decorationId, userData]);

  const selectDecoration = (value: number, item: string) => {
    if (!selectUniqueItems) return;
    selectUniqueItems({ type: "decoration", value, item });
  };

  return (
    <UserDataController>
      {decoration ? (
        <>
          <h2 className="mb-4">{decoration.title}</h2>
          <Row>
            <Col md={8}>
              <ReactMarkdown>{decoration.description}</ReactMarkdown>
            </Col>
            <Col className="text-center">
              <h1>${decoration.value}</h1>
              <div className="d-grid gap-2">
                <a
                  href="#decoration_photos"
                  className="m-2 btn btn-outline-primary btn-lg m-2"
                >
                  {t("see_photos")}
                </a>
                {isItemSelected(decoration.id, selectedUniqueItems) ? (
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
                    onClick={() =>
                      selectDecoration(decoration.value, decoration.id)
                    }
                    variant="success"
                    size="lg"
                  >
                    {t("select")}
                  </Button>
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
      ) : (
        <h2>Loading...</h2>
      )}
    </UserDataController>
  );
};

export default DecorationOption;
