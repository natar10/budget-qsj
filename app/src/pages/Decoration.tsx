import React, { useEffect, useState } from "react";
import { Props, Decoration } from "../common/types";
import { Link } from "@reach/router";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { decorations } from "../services/contentful";
import { isItemSelected, isCategorySelected } from "../common/functions";

const Decoration: React.FC<Props> = (props) => {
  const [allDecorations, setAllDecorations] = useState<Decoration[]>([]);
  const { contentfulClient, userData, selectedUniqueItems } = useAppContext();
  useEffect(() => {
    if (!contentfulClient) return;
    decorations
      .getDecorations(contentfulClient, "decoration")
      .then((allDecorations) => setAllDecorations(allDecorations))
      .catch((e) => console.log(e));
  }, [userData]);
  return (
    <UserDataController>
      <h1>Decoration</h1>
      {isCategorySelected("decoration", selectedUniqueItems) && (
        <h3>Ya seleccionaste la decoracion</h3>
      )}
      {allDecorations.map((decoration) => (
        <div key={decoration.id}>
          <h3>{decoration.title}</h3>
          {isItemSelected(decoration.id, selectedUniqueItems) && (
            <p>This item is selected</p>
          )}
          <Link to={`/decoration/${decoration.id}`}>Ver Opciones</Link>
        </div>
      ))}
    </UserDataController>
  );
};

export default Decoration;
