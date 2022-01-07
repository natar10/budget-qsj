import { Entry, EntryCollection, ContentfulClientApi } from "contentful";
import { Menu } from "../common/types";

const getMenus = (client: ContentfulClientApi, type: string) => {
  return client
    .getEntries<Menu>({
      content_type: type,
      limit: 20,
    })
    .then((response: EntryCollection<Menu>) => {
      return response.items.map((item) => {
        return { ...item.fields, id: item.sys.id };
      });
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

const getMenu = (client: ContentfulClientApi, id: string) => {
  return client
    .getEntry(id)
    .then((response) => {
      const menu = response as Entry<Menu>;
      return { ...menu.fields, id: menu.sys.id };
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

export { getMenus, getMenu };