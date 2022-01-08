import React, { useEffect, useState } from "react";
import { Props, Reception } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { receptions } from "../services/contentful";
import { isItemSelected } from "../common/functions";
import { useTranslation } from "react-i18next";
import { Col, Row, Button } from "react-bootstrap";

const Reception: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const [allReceptions, setAllReceptions] = useState<Reception[]>([]);
  const {
    contentfulClient,
    userData,
    selectedVariousItems,
    selectVariousItems,
  } = useAppContext();
  useEffect(() => {
    if (!contentfulClient) return;
    receptions
      .getReceptions(contentfulClient, "reception")
      .then((allReceptions) => setAllReceptions(allReceptions))
      .catch((e) => console.log(e));
  }, [userData]);
  const selectReception = (value: number, item: string) => {
    if (!selectVariousItems) return;
    selectVariousItems({ type: "reception", value, item });
  };
  return (
    <UserDataController>
      <h1>{t("reception")}</h1>
      <Row>
        {allReceptions.map((reception) => (
          <Col className="services" key={reception.id}>
            <h3>{reception.title}</h3>
            {isItemSelected(reception.id, selectedVariousItems) && (
              <p>{t("selected")}</p>
            )}
            <p>{reception.description}</p>
            <img
              width="90%"
              src={reception.mainPhoto.fields.file.url}
              alt={reception.title}
            />
            <div className="value">${reception.value}</div>
            <Button
              variant="success"
              size="lg"
              onClick={() => selectReception(reception.value, reception.id)}
            >
              {t("select")}
            </Button>
          </Col>
        ))}
      </Row>
    </UserDataController>
  );
};

export default Reception;
