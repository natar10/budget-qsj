const axios = require("axios");

function normalize(normalizer = false) {
  return (beg) => {
    return (end) => {
      return (str) => {
        const trimer = normalizer ? 1 : 0;
        return str.slice(beg.length, (end.length - trimer) * -1);
      };
    };
  };
}

function extractTags([beg, end], normalizer = false) {
  const matcher = new RegExp(`${beg}(.*?)${end}`, "gs");

  return function (str) {
    const match = str.match(matcher);

    if (!match) {
      return null;
    }
    return match.map(normalize(normalizer)(beg)(end));
  };
}

function findTags(content, openingTag, closeTag, normalizer = false) {
  return extractTags([openingTag, closeTag], normalizer)(content);
}

async function run() {
  const page = await axios.get("https://photos.app.goo.gl/CSV7NDstShTUwUZq5");
  const scripts = findTags(page.data, "AF_initDataCallback", "</script>");
  const rawPhotos = findTags(
    scripts[1],
    "https://lh3.googleusercontent.com/",
    ","
  );
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
}
run();
