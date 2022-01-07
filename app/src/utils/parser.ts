function normalize(normalizer: boolean = false) {
  return (beg: string) => {
    return (end: string) => {
      return (str: string) => {
        const trimer = normalizer ? 1 : 0;
        return str.slice(beg.length, (end.length - trimer) * -1);
      };
    };
  };
}

function extractTags(
  [beg, end]: [string, string],
  normalizer: boolean = false
): (str: string) => string[] | null {
  const matcher: RegExp = new RegExp(`${beg}(.*?)${end}`, "gs");

  return function (str: string) {
    const match = str.match(matcher);

    if (!match) {
      return null;
    }
    return match!.map(normalize(normalizer)(beg)(end));
  };
}

export function findTags(
  content: string,
  openingTag: string,
  closeTag: string,
  normalizer: boolean = false
): string[] | null {
  return extractTags([openingTag, closeTag], normalizer)(content);
}
