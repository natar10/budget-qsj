import React, { useEffect, useState } from "react";
import { GooglePhoto } from "../common/types";
import { Button, Col, Row } from "react-bootstrap";
import { getPhotos } from "../services/photos";

type Props = {
  albumId: string;
};

const MenuOption: React.FC<Props> = (props) => {
  const [photos, setPhotos] = useState<GooglePhoto[]>([]);
  console.log(props.albumId);

  useEffect(() => {
    getPhotos(props.albumId)
      .then((photos: GooglePhoto[]) => setPhotos(photos))
      .catch((e) => console.log(e));
  }, [props.albumId]);

  return (
    <Row>
      {photos.map((photo) => (
        <Col key={photo.id}>
          <img src={photo.baseUrl} alt="Quinta San Joaquin" />
        </Col>
      ))}
    </Row>
  );
};

export default MenuOption;
