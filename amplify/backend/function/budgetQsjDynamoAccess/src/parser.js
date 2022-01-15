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

module.exports = findTags;
