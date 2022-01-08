import React from "react";
import { useAppContext } from "../context/AppContext";
import { PropsNode, UserData } from "../common/types";
import GetUserData from "./GetUserData";
import { Container } from "react-bootstrap";
import MenuBar from "./MenuBar";
import { useTranslation } from "react-i18next";

const UserDataController: React.FC<PropsNode> = ({ children }) => {
  const { t } = useTranslation("es");
  const { userData, total } = useAppContext();
  return (
    <Container>
      {userData && <MenuBar />}
      {!userData && <h1 className="pt-5 mb-4">Quinta San Joaquin</h1>}
      {userData ? (
        <div className="content">
          {children}{" "}
          <h3 className="total">
            {t("total")}: ${total}
          </h3>
        </div>
      ) : (
        <GetUserData />
      )}
    </Container>
  );
};

export default UserDataController;
