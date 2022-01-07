import React from "react";
import { AppContextProvider, useAppContext } from "../context/AppContext";
import { UserData } from "../common/types";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Row, Col, Form, Button } from "react-bootstrap";

const Home: React.FC = () => {
  const { t } = useTranslation("es");
  const { setData } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: UserData) => {
    console.log(data);
    if (setData) {
      setData(data);
    }
  };

  return (
    <AppContextProvider>
      <Row>
        <Col className="introduction" lg={8}>
          <h2>{t("get_budget")}</h2>
          <h4>{t("find_options")}</h4>
        </Col>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>{t("eventType")}</Form.Label>
              <Form.Control
                type="text"
                {...register("eventType", { required: true })}
                name="eventType"
              />
              {errors.eventType && (
                <span className="error">{t("required")}</span>
              )}
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>{t("eventDate")}</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("eventDate", { required: true })}
                    name="eventDate"
                  />
                  {errors.eventDate && (
                    <span className="error">{t("required")}</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>{t("quantity")}</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("quantity", { required: true })}
                    name="quantity"
                  />
                  {errors.quantity && (
                    <span className="error">{t("required")}</span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                type="text"
                {...register("name", { required: true })}
                name="name"
              />
              {errors.name && <span className="error">{t("required")}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("email")}</Form.Label>
              <Form.Control
                type="email"
                {...register("email", { required: true })}
                name="email"
              />
              {errors.email && <span className="error">{t("required")}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("phone")}</Form.Label>
              <Form.Control
                type="text"
                {...register("phone", { required: true })}
                name="phone"
              />
              {errors.phone && <span className="error">{t("required")}</span>}
            </Form.Group>

            <Button type="submit" variant="light" size="lg">
              {t("quote")}
            </Button>
          </Form>
        </Col>
      </Row>
    </AppContextProvider>
  );
};

export default Home;
