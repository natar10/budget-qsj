import React, { useEffect, useState } from "react";
import { Props, Service } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { services } from "../services/contentful";
import { isItemSelected, isFree } from "../common/functions";
import { useTranslation } from "react-i18next";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "@reach/router";
import { Loading } from "../components/Loading";

const Service: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const [allServices, setAllServices] = useState<Service[]>([]);
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
    services
      .getServices(contentfulClient, "services")
      .then((allServices) => setAllServices(allServices))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [userData]);

  const selectService = (product: Service) => {
    if (!selectVariousItems) return;
    selectVariousItems({ type: "service", product });
  };

  const removeService = (product: Service) => {
    if (!removeVariousItems) return;
    removeVariousItems({ type: "service", product });
  };

  return (
    <div className={userData ? "general" : "home"}>
      <UserDataController>
        <h1>{t("services")}</h1>
        {isLoading && <Loading />}
        <Row>
          {allServices.map((service) => (
            <Col
              xs={12}
              md={6}
              className="services-container mb-2"
              key={service.id}
            >
              <div className="services">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <img
                  width="90%"
                  src={service.mainPhoto.fields.file.url}
                  alt={service.title}
                />
                <div className="value">${service.value}</div>
                {isItemSelected(service.id, selectedVariousItems) && (
                  <h4 className="mt-3">{t("selected")}</h4>
                )}
                {isFree(userData, service.title) && (
                  <h4 className="courtesy">{t("select_courtesy")}</h4>
                )}
                <Button
                  variant={
                    isItemSelected(service.id, selectedVariousItems)
                      ? "danger"
                      : "success"
                  }
                  size="lg"
                  onClick={() =>
                    isItemSelected(service.id, selectedVariousItems)
                      ? removeService(service)
                      : selectService(service)
                  }
                >
                  {isItemSelected(service.id, selectedVariousItems)
                    ? t("remove")
                    : t("select")}
                </Button>
              </div>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Link to="/reception" className="d-block btn btn-warning btn-lg">
            {t("continue_extras")}
          </Link>
        </div>
      </UserDataController>
    </div>
  );
};

export default Service;
