import React, { useEffect, useState } from "react";
import { GooglePhoto } from "../common/types";
import { Button, Col, Row } from "react-bootstrap";
import { getPhotos } from "../services/photos";

type Props = {
  albumId: string;
};

const MenuOption: React.FC<Props> = (props) => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    getPhotos(props.albumId)
      .then((data: { photos: string[] }) => setPhotos(data.photos))
      .catch(console.log);
  }, [props.albumId]);

  return (
    <Row>
      {photos.map((photo, index) => (
        <Col className="imgMenus" xs={12} md={6} key={index}>
          <img src={photo} alt="Quinta San Joaquin" />
        </Col>
      ))}
    </Row>
  );
};

export default MenuOption;
