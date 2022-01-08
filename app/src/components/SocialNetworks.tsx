import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";

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
      <Row>
        <Col>
          <SocialIcon
            target="_blank"
            rel="noopener noreferrer"
            url="https://www.instagram.com/quinta_san_joaquin"
          />
        </Col>
        <Col>
          <SocialIcon
            target="_blank"
            rel="noopener noreferrer"
            url="https://www.facebook.com/EventosSanJoaquin"
          />
        </Col>
        <Col>
          <SocialIcon
            target="_blank"
            rel="noopener noreferrer"
            url="https://www.youtube.com/watch?v=sumX5JvKbSE"
          />
        </Col>
        <Col>
          <SocialIcon
            target="_blank"
            rel="noopener noreferrer"
            url="https://api.whatsapp.com/send?phone=593993927868&text=Por%20farvor%20quisiera%20agendar%20una%20cita."
          />
        </Col>
        <Col>
          <SocialIcon
            target="_blank"
            rel="noopener noreferrer"
            url="https://goo.gl/photos/9D6GkPfGog6EWgAG8"
          />
        </Col>
      </Row>
    </>
  );
};

export default SocialNetworks;
