import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getPhotos } from "../services/photos";
import { Loading } from "./Loading";
import { useTranslation } from "react-i18next";

type Props = {
  albumId: string;
};

const MenuOption: React.FC<Props> = (props) => {
  const { t } = useTranslation("es");
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPhotos(props.albumId)
      .then((data: { photos: string[] }) => setPhotos(data.photos))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [props.albumId]);

  return (
    <Row>
      {isLoading && <Loading />}
      {photos.map((photo, index) => (
        <Col className="imgMenus" xs={12} md={6} key={index}>
          <img src={photo} alt={t("qsj")} />
        </Col>
      ))}
    </Row>
  );
};

export default MenuOption;
