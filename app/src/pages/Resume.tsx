import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Props } from "../common/types";
import { calculateTotal } from "../common/functions";
import { Redirect } from "@reach/router";
import SocialNetworks from "../components/SocialNetworks";

const Resume: React.FC<Props> = () => {
  const { t } = useTranslation("es");
  const { userData, selectedUniqueItems, selectedVariousItems, total } =
    useAppContext();
  return (
    <>
      {userData ? (
        <div className={userData ? "general" : "home"}>
          <UserDataController>
            <h3>
              {t("hello")}, {userData?.name}
            </h3>
            <hr />
            <p>{t("this_is_resume")}</p>
            <h2>{t("resume")}:</h2>
            <hr />

            <Row className="resume_row">
              <Col>
                <strong>Producto seleccionado</strong>
              </Col>
              <Col className="d-none d-md-block">
                <strong>Categoria</strong>
              </Col>
              <Col>
                <strong>Precio unitario</strong>
              </Col>
              <Col>
                <strong>Cant Invitados</strong>
              </Col>
              <Col>
                <strong>Sub Total</strong>
              </Col>
            </Row>
            {selectedUniqueItems.map((item) => (
              <Row className="resume_row" key={item.product.id}>
                <Col>{item.product.title}</Col>
                <Col className="d-none d-md-block">{t(item.type)}</Col>
                <Col>${item.product.value}</Col>
                <Col>
                  {item.product.calculate
                    ? userData?.quantity
                    : t("flat_value")}
                </Col>
                <Col>
                  <strong>
                    $
                    {item.product.calculate
                      ? calculateTotal(item, +userData.quantity)
                      : item.product.value}
                  </strong>
                </Col>
              </Row>
            ))}

            {selectedVariousItems.map((item) => (
              <Row className="resume_row" key={item.product.id}>
                <Col>{item.product.title}</Col>
                <Col className="d-none d-md-block">{item.type}</Col>
                <Col>${item.product.value}</Col>
                <Col>
                  {item.product.calculate
                    ? userData?.quantity
                    : t("flat_value")}
                </Col>
                <Col>
                  $
                  {item.product.calculate
                    ? calculateTotal(item, +userData.quantity)
                    : item.product.value}
                </Col>
              </Row>
            ))}
            <hr />
            <p>{t("this_is_total")}:</p>
            <h3>
              {t("total")}: ${total}
            </h3>
            <hr className="mt-4 mb-4" />
            <SocialNetworks />
          </UserDataController>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Resume;
