const axios = require("axios");
const findTags = require("./parser");

const getPhotos = (album) => {
  return axios
    .get(`https://photos.app.goo.gl/${album}`)
    .then((page) => parsePhotos(page.data))
    .catch((e) => {
      console.log(e);
      throw new Error(e);
    });
};

const parsePhotos = (page) => {
  const scripts = findTags(page, "AF_initDataCallback", "</script>");
  if (!scripts) return [];

  const rawPhotos = findTags(
    scripts[1],
    "https://lh3.googleusercontent.com/",
    ","
  );
  if (!rawPhotos) return [];

  const photos = rawPhotos
    .filter((raw) => !raw.includes("]"))
    .filter((raw) => raw.length > 121)
    .filter((element, index) => {
      return rawPhotos.indexOf(element) === index;
    })
    .map(
      (raw) =>
        `https://lh3.googleusercontent.com/${raw.slice(0, -1)}=w1920-h1080`
    );

  return photos;
};

module.exports = getPhotos;
