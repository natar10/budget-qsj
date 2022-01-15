import React, { useState } from "react";
import { AppContextProvider, useAppContext } from "../context/AppContext";
import { UserData } from "../common/types";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Row, Col, Form, Button } from "react-bootstrap";
import { API } from "aws-amplify";
import "react-datepicker/dist/react-datepicker.css";

const Home: React.FC = () => {
  const { t } = useTranslation("es");
  const [isLoading, setIsLoading] = useState(false);
  const { setData } = useAppContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: UserData) => {
    setIsLoading(true);
    console.log("data", data);
    const bodyData = {
      body: data,
    };
    API.post("apiBudgetQsj", "/photos", bodyData)
      .then((response) => {
        console.log("OKOKOK", response);
        setIsLoading(false);
      })
      .catch((e) => console.log("eeeeeeeeeee", e));
    if (setData) {
      setData(data);
    }
  };

  const setEventDate = (date: Date | null) => {
    setValue("eventDate", date);
  };

  const cantQuantity = Array.from(Array(52).keys());

  return (
    <AppContextProvider>
      <Row>
        <Col className="introduction mt-3" lg={8}>
          <h2>{t("get_budget")}</h2>
          <h4>{t("find_options")}</h4>
          <hr />
          <h3>{t("fill_form")}</h3>
        </Col>
        <Col className="mt-3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>{t("eventType")}</Form.Label>
              <Form.Select
                {...register("eventType", { required: true })}
                name="eventType"
              >
                <option>--Selecciona--</option>
                <option value="Boda Religiosa">Boda Religiosa</option>
                <option value="Boda Civil">Boda Civil</option>
                <option value="Bautizo">Bautizo</option>
                <option value="Quince años">Quince años</option>
                <option value="Cumpleaños">Cumpleaños</option>
                <option value="Otros">Otros</option>
              </Form.Select>
              {errors.eventType && (
                <span className="error">{t("required")}</span>
              )}
            </Form.Group>

            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("eventDate")}</Form.Label>
                  <DatePicker
                    className="form-control"
                    selected={watch("eventDate") || new Date()}
                    onChange={(date) => setEventDate(date)}
                  />
                  {errors.eventDate && (
                    <span className="error">{t("required")}</span>
                  )}
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("quantity")}</Form.Label>

                  <Form.Select
                    {...register("quantity", { required: true })}
                    name="quantity"
                  >
                    <option>{t("selector")}</option>
                    {cantQuantity.slice(3, -1).map((quantity) => (
                      <option key={quantity} value={quantity * 10}>
                        {quantity * 10}
                      </option>
                    ))}
                  </Form.Select>
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
                placeholder={t("name")}
                {...register("name", { required: true })}
                name="name"
              />
              {errors.name && <span className="error">{t("required")}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@test.com"
                {...register("email", { required: true })}
                name="email"
              />
              {errors.email && <span className="error">{t("required")}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("phone")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="0987234234"
                {...register("phone", { required: true })}
                name="phone"
              />
              {errors.phone && <span className="error">{t("required")}</span>}
            </Form.Group>

            <Button type="submit" variant="light" size="lg">
              {isLoading ? t("loading") : t("quote")}
            </Button>
          </Form>
        </Col>
      </Row>
    </AppContextProvider>
  );
};

export default Home;
