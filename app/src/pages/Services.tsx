import React, { useEffect, useState } from "react";
import { Props, Service } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { services } from "../services/contentful";
import { isItemSelected } from "../common/functions";
import { useTranslation } from "react-i18next";
import { Col, Row, Button } from "react-bootstrap";

const Service: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const [allServices, setAllServices] = useState<Service[]>([]);
  const {
    contentfulClient,
    userData,
    selectedVariousItems,
    selectVariousItems,
  } = useAppContext();
  useEffect(() => {
    if (!contentfulClient) return;
    services
      .getServices(contentfulClient, "services")
      .then((allServices) => setAllServices(allServices))
      .catch((e) => console.log(e));
  }, [userData]);
  const selectService = (value: number, item: string) => {
    if (!selectVariousItems) return;
    selectVariousItems({ type: "service", value, item });
  };
  return (
    <UserDataController>
      <h1>{t("services")}</h1>
      <Row>
        {allServices.map((service) => (
          <Col className="services" key={service.id}>
            <h3>{service.title}</h3>
            {isItemSelected(service.id, selectedVariousItems) && (
              <p>{t("selected")}</p>
            )}
            <p>{service.description}</p>
            <img
              width="90%"
              src={service.mainPhoto.fields.file.url}
              alt={service.title}
            />
            <div className="value">${service.value}</div>
            <Button
              variant="success"
              size="lg"
              onClick={() => selectService(service.value, service.id)}
            >
              {t("select")}
            </Button>
          </Col>
        ))}
      </Row>
    </UserDataController>
  );
};

export default Service;
