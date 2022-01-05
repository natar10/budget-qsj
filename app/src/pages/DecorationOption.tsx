import React, { useEffect, useState } from "react";
import { isItemSelected } from "../common/functions";
import { Decoration, Props } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { decorations } from "../services/contentful";
import { useParams } from "@reach/router";

type Params = {
  decorationId: string;
};

const DecorationOption: React.FC<Props> = (props) => {
  const { selectUniqueItems, selectedUniqueItems, contentfulClient, userData } =
    useAppContext();
  const [decoration, setDecoration] = useState<Decoration | null>(null);
  const { decorationId } = useParams<Params>();

  useEffect(() => {
    if (!contentfulClient || !decorationId) return;
    decorations
      .getDecoration(contentfulClient, decorationId)
      .then((decorationItem: Decoration) => setDecoration(decorationItem))
      .catch((e) => console.log(e));
  }, [decorationId, userData]);

  const selectDecoration = (value: number, item: string) => {
    if (!selectUniqueItems) return;
    selectUniqueItems({ type: "decoration", value, item });
  };

  return (
    <UserDataController>
      {decoration ? (
        <>
          <h1>{decoration.title}</h1>
          <p>This is a decoration option</p>
          {isItemSelected(decoration.id, selectedUniqueItems) ? (
            <>This decoration is selected</>
          ) : (
            <button
              onClick={() => selectDecoration(decoration.value, decoration.id)}
            >
              Select this option
            </button>
          )}
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </UserDataController>
  );
};

export default DecorationOption;
