import { ContentfulClientApi } from "contentful";
import { CONTENTFUL_CREDENTIALS } from "../common/constants";
import * as menus from "./menus";
import * as decorations from "./decorations";
import * as services from "./services";
import * as receptions from "./receptions";
import * as individual from "./individual";
const contentful = require("contentful");

const createClient = (): ContentfulClientApi => {
  return contentful.createClient({
    space: CONTENTFUL_CREDENTIALS.space,
    accessToken: CONTENTFUL_CREDENTIALS.accessToken,
  });
};

export { createClient, menus, decorations, services, receptions, individual };
