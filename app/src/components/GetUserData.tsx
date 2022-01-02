import React from "react";
import { AppContextProvider, useAppContext } from "../context/AppContext";
import { Props, UserData } from "../common/types";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("eventType", { required: true })}
          name="eventType"
          placeholder="eventType"
        />
        {errors.eventType && <span>This field is required</span>}
        <br />
        <br />
        <input
          type="text"
          {...register("name", { required: true })}
          name="name"
          placeholder="name"
        />
        {errors.name && <span>This field is required</span>}
        <br />
        <br />
        <input
          type="text"
          {...register("email", { required: true })}
          name="email"
          placeholder="email"
        />
        {errors.email && <span>This field is required</span>}
        <br />
        <br />
        <input
          type="text"
          {...register("phone", { required: true })}
          name="phone"
          placeholder="phone"
        />
        {errors.phone && <span>This field is required</span>}
        <br />
        <br />
        <input
          type="text"
          {...register("eventDate", { required: true })}
          name="eventDate"
          placeholder="eventDate"
        />
        {errors.eventDate && <span>This field is required</span>}
        <br />
        <br />
        <input
          type="text"
          {...register("quantity", { required: true })}
          name="quantity"
          placeholder="quantity"
        />
        {errors.quantity && <span>This field is required</span>}
        <br />
        <br />

        <button>{t("quote")}</button>
      </form>
      <Link to="menu">Select menu</Link>
    </AppContextProvider>
  );
};

export default Home;
