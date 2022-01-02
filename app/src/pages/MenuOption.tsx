import React from "react";
import { Props } from "../common/types";
import { useAppContext } from "../context/AppContext";
import UserDataController from "../components/UserDataController";

const MenuOption: React.FC<Props> = (props) => {
  const { setTotal, selectItems, selectedItems } = useAppContext();

  const selectMenu = (value: number, item: string) => {
    if (!setTotal || !selectItems) return;
    setTotal(value);
    selectItems(item);
  };

  return (
    <UserDataController>
      <h1>MenuOption</h1>
      <p>This is a menu option</p>
      {selectedItems.includes("id-of-item") ? (
        <>This menu is selected</>
      ) : (
        <button onClick={() => selectMenu(30, "id-of-item")}>
          Select this option
        </button>
      )}
    </UserDataController>
  );
};

export default MenuOption;
