import { Entry, EntryCollection, ContentfulClientApi } from "contentful";
import { Decoration } from "../common/types";

const compare = (a: Decoration, b: Decoration) => a.value - b.value;

const getDecorations = (client: ContentfulClientApi, type: string) => {
  return client
    .getEntries<Decoration>({
      content_type: type,
      limit: 20,
    })
    .then((response: EntryCollection<Decoration>) => {
      return response.items
        .map((item) => {
          return { ...item.fields, id: item.sys.id };
        })
        .sort(compare);
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

const getDecoration = (client: ContentfulClientApi, id: string) => {
  return client
    .getEntry(id)
    .then((response) => {
      const menu = response as Entry<Decoration>;
      return { ...menu.fields, id: menu.sys.id };
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

export { getDecorations, getDecoration };
