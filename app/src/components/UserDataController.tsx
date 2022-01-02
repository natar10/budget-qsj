import React from "react";
import { useAppContext } from "../context/AppContext";
import { PropsNode, UserData } from "../common/types";
import GetUserData from "./GetUserData";

const UserDataController: React.FC<PropsNode> = ({ children }) => {
  const { userData, total } = useAppContext();
  return (
    <>
      {userData ? (
        <>
          {children} <h3>This is the total: {total}</h3>
        </>
      ) : (
        <GetUserData />
      )}
    </>
  );
};

export default UserDataController;
