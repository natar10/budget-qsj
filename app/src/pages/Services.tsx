import React, { useEffect, useState } from "react";
import { Props, Service } from "../common/types";
import { Link } from "@reach/router";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { services } from "../services/contentful";
import { isItemSelected, isCategorySelected } from "../common/functions";

const Service: React.FC<Props> = (props) => {
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
      <h1>Service</h1>
      {allServices.map((service) => (
        <div key={service.id}>
          <h3>{service.title}</h3>
          {isItemSelected(service.id, selectedVariousItems) && (
            <p>This item is selected</p>
          )}
          <button onClick={() => selectService(service.value, service.id)}>
            Select this option
          </button>
        </div>
      ))}
    </UserDataController>
  );
};

export default Service;
