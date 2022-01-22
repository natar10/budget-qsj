import React from "react";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Props } from "../common/types";
import { calculateTotal, isFree } from "../common/functions";
import { Redirect } from "@reach/router";
import SocialNetworks from "../components/SocialNetworks";
import { IVA } from "../common/constants";

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
                <strong>{t("selected_product")}</strong>
              </Col>
              <Col className="d-none d-md-block">
                <strong>{t("category")}</strong>
              </Col>
              <Col>
                <strong>{t("unit_price")}</strong>
              </Col>
              <Col>
                <strong>{t("quantity_assistants")}</strong>
              </Col>
              <Col>
                <strong>{t("sub_total")}</strong>
              </Col>
            </Row>
            {selectedUniqueItems.map((item) => (
              <Row className="resume_row" key={item.product.id}>
                <Col>{item.product.title}</Col>
                <Col className="d-none d-md-block">{t(item.type)}</Col>
                <Col>
                  {item.type !== "decoration" && item.type !== "ceremony"
                    ? `$${item.product.value}`
                    : t("flat_value")}
                </Col>
                <Col>
                  {item.product.calculate &&
                  item.type !== "decoration" &&
                  item.type !== "ceremony"
                    ? userData?.quantity
                    : t("flat_value")}
                </Col>
                <Col>
                  <strong>
                    $
                    {item.product.calculate
                      ? calculateTotal(
                          item,
                          +userData.quantity,
                          item.product.addQuantity
                        )
                      : item.product.value}
                  </strong>
                </Col>
              </Row>
            ))}

            {selectedVariousItems.map((item) => (
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
                  $
                  {isFree(userData, item.product.title) ? (
                    <span className="courtesy">0 - {t("courtesy")}!</span>
                  ) : (
                    <>
                      {item.product.calculate
                        ? calculateTotal(item, +userData.quantity)
                        : item.product.value}
                    </>
                  )}
                </Col>
              </Row>
            ))}
            <hr />
            <p>{t("this_is_total")}:</p>
            <h3>
              {t("total")}: ${total}
            </h3>
            <p>
              {t("iva_not_included")}: ${(total * IVA).toFixed(2)}
            </p>
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
