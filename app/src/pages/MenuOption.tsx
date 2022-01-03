import React, { useEffect, useState } from "react";
import { Menu, Props } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";
import { getMenu } from "../services/contentful";
import { useParams } from "@reach/router";

type Params = {
  menuId: string;
};

const MenuOption: React.FC<Props> = (props) => {
  const { setTotal, selectItems, selectedItems, contentfulClient, userData } =
    useAppContext();
  const [menu, setMenu] = useState<Menu | null>(null);
  const { menuId } = useParams<Params>();

  useEffect(() => {
    if (!contentfulClient || !menuId) return;
    getMenu(contentfulClient, menuId)
      .then((menuItem: Menu) => setMenu(menuItem))
      .catch((e) => console.log(e));
  }, [menuId, userData]);

  const selectMenu = (value: number, item: string) => {
    if (!setTotal || !selectItems) return;
    setTotal(value);
    selectItems(item);
  };

  return (
    <UserDataController>
      {menu ? (
        <>
          <h1>{menu.title}</h1>
          <p>This is a menu option</p>
          {selectedItems.includes(menu.id) ? (
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
