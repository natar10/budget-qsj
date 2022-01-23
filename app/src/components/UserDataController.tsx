import React, { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import { useAppContext } from "../context/AppContext";
import { PropsNode } from "../common/types";
import GetUserData from "./GetUserData";
import { Container } from "react-bootstrap";
import MenuBar from "./MenuBar";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import { useLocation } from "@reach/router";

const UserDataController: React.FC<PropsNode> = ({
  children,
  additionalClass,
}: PropsNode) => {
  const location = useLocation();
  const { t } = useTranslation("es");
  const { userData, total } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={`${additionalClass}`}>
      {userData && <MenuBar />}
      {!userData && <h1 className="pt-5 mb-4">{t("qsj")}</h1>}
      {userData ? (
        <>
          <div className="content">
            {children}{" "}
            {total !== 0 && location.pathname !== "/resume" && (
              <div className="total">
                <h5>{t("have_selected")}:</h5>
                <Link className="btn btn-lg btn-success" to="/resume">
                  {t("see_resume")}
                </Link>
              </div>
            )}
          </div>
          <ScrollToTop className="scroll-top" smooth top={40} />
        </>
      ) : (
        <GetUserData />
      )}
    </Container>
  );
};

export default UserDataController;
