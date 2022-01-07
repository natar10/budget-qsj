import axios from "axios";
import { API } from "aws-amplify";

export const getPhotos = (album: string) => {
  console.log("album", album);
  const t = "tester";
  return API.get("apiBudgetQsj", `/photos/${album}`, null)
    .then((response) => {
      console.log("********response", response);
      return response;
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};
