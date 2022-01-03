import React, { useEffect, useState } from "react";
import { Props, Menu } from "../common/types";
import { Link } from "@reach/router";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { getMenus } from "../services/contentful";

const Menu: React.FC<Props> = (props) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const { contentfulClient, userData, selectedItems } = useAppContext();
  useEffect(() => {
    if (!contentfulClient) return;
    getMenus(contentfulClient, "menu")
      .then((menus) => setMenus(menus))
      .catch((e) => console.log(e));
  }, [userData]);
  return (
    <UserDataController>
      <h1>Menu</h1>

      {menus.map((menu) => (
        <div key={menu.id}>
          <h3>{menu.title}</h3>
          {selectedItems.includes(menu.id) && <p>This item is selected</p>}
          <Link to={`/menu/${menu.id}`}>Ver Opciones</Link>
        </div>
      ))}
    </UserDataController>
  );
};

export default Menu;
