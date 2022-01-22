import React, { useEffect, useState } from "react";
import { Props, Reception } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { receptions } from "../services/contentful";
import { isItemSelected } from "../common/functions";
import { useTranslation } from "react-i18next";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "@reach/router";
import { Loading } from "../components/Loading";

const Reception: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const [allReceptions, setAllReceptions] = useState<Reception[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    contentfulClient,
    userData,
    selectedVariousItems,
    selectVariousItems,
    removeVariousItems,
  } = useAppContext();

  useEffect(() => {
    if (!contentfulClient) return;
    receptions
      .getReceptions(contentfulClient, "reception")
      .then((allReceptions) => setAllReceptions(allReceptions))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [userData]);

  const selectReception = (product: Reception) => {
    if (!selectVariousItems) return;
    selectVariousItems({ type: "reception", product });
  };

  const removeReception = (product: Reception) => {
    if (!removeVariousItems) return;
    removeVariousItems({ type: "reception", product });
  };

  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        <h1>{t("reception")}</h1>
        {isLoading && <Loading />}
        <Row>
          {allReceptions.map((reception) => (
            <Col
              xs={12}
              md={6}
              className="services-container mb-2"
              key={reception.id}
            >
              <div className="services">
                <h3>{reception.title}</h3>
                <p>{reception.description}</p>
                <img
                  width="90%"
                  src={reception.mainPhoto.fields.file.url}
                  alt={reception.title}
                />
                <div className="value">${reception.value}</div>
                {isItemSelected(reception.id, selectedVariousItems) && (
                  <h4 className="mt-3">{t("selected")}</h4>
                )}
                <Button
                  variant={
                    isItemSelected(reception.id, selectedVariousItems)
                      ? "danger"
                      : "success"
                  }
                  size="lg"
                  onClick={() =>
                    isItemSelected(reception.id, selectedVariousItems)
                      ? removeReception(reception)
                      : selectReception(reception)
                  }
                >
                  {isItemSelected(reception.id, selectedVariousItems)
                    ? t("remove")
                    : t("select")}
                </Button>
              </div>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Link to="/resume" className="d-block btn btn-warning btn-lg">
            {t("continue_resume")}
          </Link>
        </div>
      </UserDataController>
    </div>
  );
};

export default Reception;
