import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";

const SocialIcons: React.FC = () => {
  const { t } = useTranslation("es");
  return (
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
  );
};

export default SocialIcons;
