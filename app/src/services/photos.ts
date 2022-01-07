import axios from "axios";
import { API } from "aws-amplify";

import type { GooglePhoto, GooglePhotoResponse } from "../common/types";

export const getPhotos = (album: string) => {
  return API.get("apiBudgetQsj", "/photos", null)
    .then((response) => {
      console.log("********response", response);
      return response;
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};
