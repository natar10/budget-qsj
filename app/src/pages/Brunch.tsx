import React, { useEffect, useState } from "react";
import { Brunch, Props } from "../common/types";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import GooglePhotos from "../components/GooglePhotos";
import { CONTENTFUL } from "../common/constants";
import { Container, Row, Col } from "react-bootstrap";
import { individual } from "../services/contentful";
import { Entry } from "contentful";
import ReactMarkdown from "react-markdown";
import SocialIcons from "../components/SocialIcons";
import BookBrunch from "../components/BookBrunch";

const Home: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const { contentfulClient } = useAppContext();
  const [content, setContent] = useState<Entry<Brunch> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!contentfulClient) return;
    individual
      .getContent(contentfulClient, CONTENTFUL.brunchMenu)
      .then(setContent)
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className="general">
      <h1 className="pt-5 mb-4">{t("qsj")}</h1>
      <h3>{t("brunch.welcome")}</h3>
      <Container className="main-photo-brunch d-none d-md-block" fluid>
        <img src={content?.fields.mainPhoto.fields.file.url} alt="Brunch" />
      </Container>
      <Container
        className="main-photo-mobile-brunch d-md-none d-block d-md-none"
        fluid
      >
        <img src={content?.fields.mobileImage.fields.file.url} alt="Brunch" />
      </Container>
      <Container className="brunch-info">
        {content ? (
          <>
            <ReactMarkdown className="brunch-includes">
              {content.fields.information}
            </ReactMarkdown>
            <a href="#brunch_photos" className="m-2 btn btn-success btn-lg m-2">
              {t("see_photos")}
            </a>
            <hr />
            <h3>Menu</h3>
            <Row>
              <Col sm={12} md={4}>
                <ReactMarkdown>{content.fields.varieties}</ReactMarkdown>
              </Col>
              <Col sm={12} md={4}>
                <ReactMarkdown>{content.fields.drinks}</ReactMarkdown>
              </Col>
              <Col sm={12} md={4}>
                <ReactMarkdown>{content.fields.milky}</ReactMarkdown>
              </Col>
            </Row>
            <h3 className="text-center">{t("brunch.specialties")}</h3>
            <Row>
              <Col className="specialties" sm={12} md={6}>
                <ReactMarkdown>{content.fields.specialties1}</ReactMarkdown>
              </Col>
              <Col className="specialties" sm={12} md={6}>
                <ReactMarkdown>{content.fields.specialties2}</ReactMarkdown>
              </Col>
            </Row>
            <h3>{t("brunch.cost")}:</h3>
            <div className="costs">
              <h2>{content.fields.adultValue}</h2>
              <span>+IVA</span>
              <h3>{content.fields.adultPriceSpecs}</h3>
            </div>
            <div className="costs">
              <h2>{content.fields.childValue}</h2>
              <span>+IVA</span>
              <h3>{content.fields.childPriceSpecs}</h3>
            </div>
            <hr />
            <BookBrunch dates={Object.values(content.fields.datesAvailable)} />
            <hr />
            <br />
            <br />
            <div className="costs">
              <ReactMarkdown>{content.fields.promotion}</ReactMarkdown>
            </div>
            <br />
            <br />
            <div className="contact mb-4">
              <ReactMarkdown>{content.fields.contact}</ReactMarkdown>
            </div>

            <h3 id="brunch_photos" className="mb-5 mt-3">
              {t("brunch.photos")}
            </h3>
            <GooglePhotos albumId={content.fields.photoAlbum} />
            <br />
            <br />
            <SocialIcons />
          </>
        ) : (
          <h3 className="text-center">{t("loading")}</h3>
        )}
      </Container>
    </div>
  );
};

export default Home;
