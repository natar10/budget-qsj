import React, { useState } from "react";
import { AppContextProvider, useAppContext } from "../context/AppContext";
import { UserData } from "../common/types";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Row, Col, Form, Button } from "react-bootstrap";
import { API } from "aws-amplify";

interface Props {
  dates: string[];
}

const BookBrunch: React.FC<Props> = ({ dates }: Props) => {
  const { t } = useTranslation("es");
  const [isLoading, setIsLoading] = useState(false);
  const [wasSent, setWasSent] = useState(false);
  const { setData } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: UserData) => {
    setIsLoading(true);
    const bodyData = {
      body: data,
    };
    API.put("apiBudgetQsj", "/photos/brunch", bodyData)
      .then(() => {
        setIsLoading(false);
        setWasSent(true);
      })
      .catch((e) => console.log("Error:", e));
    if (setData) {
      setData(data);
    }
  };

  const cantQuantity = Array.from(Array(52).keys());

  return (
    <AppContextProvider>
      <Row>
        <Col className="introduction brunch mt-3" sm={12} md={4}>
          <h2>{t("brunch.book_now")}</h2>
          <h3>{t("brunch.data")}</h3>
        </Col>
        <Col sm={12} md={8} className="mt-3">
          {!wasSent ? (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("name")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("name")}
                      {...register("name", { required: true })}
                      name="name"
                    />
                    {errors.name && (
                      <span className="error">{t("required")}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>{t("brunch.quantity")}</Form.Label>

                    <Form.Select
                      {...register("quantity", { required: true })}
                      name="quantity"
                    >
                      <option>{t("selector")}</option>
                      {cantQuantity.slice(1, -1).map((quantity) => (
                        <option key={quantity} value={quantity * 10}>
                          {quantity}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.quantity && (
                      <span className="error">{t("required")}</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("brunch.childrenQuantity")}</Form.Label>

                    <Form.Select
                      {...register("childrenQuantity", { required: true })}
                      name="childrenQuantity"
                    >
                      <option>{t("selector")}</option>
                      {cantQuantity.slice(1, -1).map((childrenQuantity) => (
                        <option
                          key={childrenQuantity}
                          value={childrenQuantity * 10}
                        >
                          {childrenQuantity}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.quantity && (
                      <span className="error">{t("required")}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("email")}</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="example@test.com"
                      {...register("email", { required: true })}
                      name="email"
                    />
                    {errors.email && (
                      <span className="error">{t("required")}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>{t("phone")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0987234234"
                      {...register("phone", { required: true })}
                      name="phone"
                    />
                    {errors.phone && (
                      <span className="error">{t("required")}</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("brunch.date")}</Form.Label>

                    <Form.Select
                      {...register("date", { required: true })}
                      name="date"
                    >
                      <option>{t("selector")}</option>
                      {dates.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.date && (
                      <span className="error">{t("required")}</span>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>{t("brunch.requirements")}</Form.Label>
                <Form.Control
                  type="text"
                  {...register("requirements", { required: false })}
                  name="requirements"
                />
              </Form.Group>

              <Button
                disabled={isLoading}
                type="submit"
                variant="success"
                size="lg"
              >
                {isLoading ? t("loading") : t("brunch.book")}
              </Button>
            </Form>
          ) : (
            <div>
              <h2>{t("brunch.thank_for_booking")}</h2>
              <h3>{t("brunch.nice_day")}</h3>
            </div>
          )}
        </Col>
      </Row>
    </AppContextProvider>
  );
};

export default BookBrunch;
