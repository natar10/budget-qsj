import { Entry, EntryCollection, ContentfulClientApi } from "contentful";
import { Reception } from "../common/types";

const getReceptions = (client: ContentfulClientApi, type: string) => {
  return client
    .getEntries<Reception>({
      content_type: type,
      limit: 20,
    })
    .then((response: EntryCollection<Reception>) => {
      return response.items.map((item) => {
        return { ...item.fields, id: item.sys.id };
      });
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

const getReception = (client: ContentfulClientApi, id: string) => {
  return client
    .getEntry(id)
    .then((response) => {
      const menu = response as Entry<Reception>;
      return { ...menu.fields, id: menu.sys.id };
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

export { getReceptions, getReception };
