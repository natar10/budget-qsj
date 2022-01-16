import { ContentfulClientApi, Entry } from "contentful";
import { Brunch } from "../common/types";

const getContent = (client: ContentfulClientApi, contentId: string) => {
  return client
    .getEntry(contentId)
    .then((response) => {
      return response as Entry<Brunch>;
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

export { getContent };
