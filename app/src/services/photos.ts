import { API } from "aws-amplify";

export const getPhotos = (album: string) => {
  return API.get("apiBudgetQsj", `/photos/${album}`, null)
    .then((response) => {
      return response;
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};
