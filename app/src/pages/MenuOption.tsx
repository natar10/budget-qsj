import React, { useEffect, useState } from "react";
import { isItemSelected } from "../common/functions";
import { Menu, Props } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { menus } from "../services/contentful";
import { useParams } from "@reach/router";

type Params = {
  menuId: string;
};

const MenuOption: React.FC<Props> = (props) => {
  const { selectUniqueItems, selectedUniqueItems, contentfulClient, userData } =
    useAppContext();
  const [menu, setMenu] = useState<Menu | null>(null);
  const { menuId } = useParams<Params>();

  useEffect(() => {
    if (!contentfulClient || !menuId) return;
    menus
      .getMenu(contentfulClient, menuId)
      .then((menuItem: Menu) => setMenu(menuItem))
      .catch((e) => console.log(e));
  }, [menuId, userData]);

  const selectMenu = (value: number, item: string) => {
    if (!selectUniqueItems) return;
    selectUniqueItems({ type: "menu", value, item });
  };

  return (
    <UserDataController>
      {menu ? (
        <>
          <h1>{menu.title}</h1>
          <p>This is a menu option</p>
          {isItemSelected(menu.id, selectedUniqueItems) ? (
            <>This menu is selected</>
          ) : (
            <button onClick={() => selectMenu(30, menu.id)}>
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

export default MenuOption;
