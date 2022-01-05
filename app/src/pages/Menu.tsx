import React, { useEffect, useState } from "react";
import { Props, Menu } from "../common/types";
import { Link } from "@reach/router";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { menus } from "../services/contentful";
import { isItemSelected, isCategorySelected } from "../common/functions";

const Menu: React.FC<Props> = (props) => {
  const [allMenus, setAllMenus] = useState<Menu[]>([]);
  const { contentfulClient, userData, selectedUniqueItems } = useAppContext();
  useEffect(() => {
    if (!contentfulClient) return;
    menus
      .getMenus(contentfulClient, "menu")
      .then((allMenus) => setAllMenus(allMenus))
      .catch((e) => console.log(e));
  }, [userData]);
  return (
    <UserDataController>
      <h1>Menu</h1>
      {isCategorySelected("menu", selectedUniqueItems) && (
        <h3>Ya seleccionaste el menu</h3>
      )}
      {allMenus.map((menu) => (
        <div key={menu.id}>
          <h3>{menu.title}</h3>
          {isItemSelected(menu.id, selectedUniqueItems) && (
            <p>This item is selected</p>
          )}
          <Link to={`/menu/${menu.id}`}>Ver Opciones</Link>
        </div>
      ))}
    </UserDataController>
  );
};

export default Menu;
