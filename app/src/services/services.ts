import { Entry, EntryCollection, ContentfulClientApi } from "contentful";
import { Service } from "../common/types";

const getServices = (client: ContentfulClientApi, type: string) => {
  return client
    .getEntries<Service>({
      content_type: type,
      limit: 20,
    })
    .then((response: EntryCollection<Service>) => {
      return response.items.map((item) => {
        return { ...item.fields, id: item.sys.id };
      });
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

const getService = (client: ContentfulClientApi, id: string) => {
  return client
    .getEntry(id)
    .then((response) => {
      const menu = response as Entry<Service>;
      return { ...menu.fields, id: menu.sys.id };
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

export { getServices, getService };
