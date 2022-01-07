import React from "react";
import { useAppContext } from "../context/AppContext";
import { PropsNode, UserData } from "../common/types";
import GetUserData from "./GetUserData";
import { Container } from "react-bootstrap";

const UserDataController: React.FC<PropsNode> = ({ children }) => {
  const { userData, total } = useAppContext();
  return (
    <Container>
      <h1 className="pt-4 mb-4">Quinta San Joaquin</h1>
      {userData ? (
        <>
          {children} <h3>This is the total: {total}</h3>
        </>
      ) : (
        <GetUserData />
      )}
    </Container>
  );
};

export default UserDataController;
