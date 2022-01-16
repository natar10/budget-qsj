import React from "react";
import { useTranslation } from "react-i18next";
import SocialIcons from "./SocialIcons";

const SocialNetworks: React.FC = () => {
  const { t } = useTranslation("es");
  return (
    <>
      <a
        className="btn btn-lg btn-warning"
        href="https://api.whatsapp.com/send?phone=593993927868&text=Por%20farvor%20quisiera%20agendar%20una%20cita."
        target="_blank"
      >
        Haz clic aqui para agendar una Cita en nuestras instalaciones
      </a>
      <hr />
      <SocialIcons />
    </>
  );
};

export default SocialNetworks;
