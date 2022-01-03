import { Asset, ContentfulClientApi } from "contentful";
import { ReactNode } from "react";

export type LoadingStatus = "LOADING" | "ERROR" | "LOADED";

export type ContextState = {
  status: "LOADING" | "ERROR" | "LOADED";
  userData: UserData | null;
  total: number;
  selectedItems: string[];
  contentfulClient: ContentfulClientApi | null;
  setData?: (userData: UserData) => void;
  setTotal?: (value: number) => void;
  selectItems?: (item: string) => void;
};

export interface Props {
  path: string;
  exact?: boolean;
}

export interface UserData {
  eventType: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  quantity: string;
}

export interface PropsNode {
  children: ReactNode;
}

export interface Menu {
  id: string;
  title: string;
  description: string;
  photosUrl: string;
  value: number;
  mainPhoto: Asset;
  additionalPhotos: Asset[];
}
