import React, { useEffect, useState } from "react";
import { Props, Reception } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { receptions } from "../services/contentful";
import { isItemSelected, isCategorySelected } from "../common/functions";

const Reception: React.FC<Props> = (props) => {
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
      <h1>Reception</h1>
      {allReceptions.map((reception) => (
        <div key={reception.id}>
          <h3>{reception.title}</h3>
          {isItemSelected(reception.id, selectedVariousItems) && (
            <p>This item is selected</p>
          )}
          <button
            onClick={() => selectReception(reception.value, reception.id)}
          >
            Select this option
          </button>
        </div>
      ))}
    </UserDataController>
  );
};

export default Reception;
