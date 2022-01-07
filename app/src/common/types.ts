import { Asset, ContentfulClientApi } from "contentful";
import { ReactNode } from "react";

export type LoadingStatus = "LOADING" | "ERROR" | "LOADED";

export type ContextState = {
  status: "LOADING" | "ERROR" | "LOADED";
  userData: UserData | null;
  total: number;
  selectedUniqueItems: SelectedItem[];
  selectedVariousItems: SelectedItem[];
  contentfulClient: ContentfulClientApi | null;
  setData?: (userData: UserData) => void;
  setTotal?: (value: number) => void;
  selectUniqueItems?: (item: SelectedItem) => void;
  selectVariousItems?: (item: SelectedItem) => void;
};

export interface Props {
  path: string;
  exact?: boolean;
}

export type ContentType = "menu" | "service" | "decoration" | "reception";
export interface SelectedItem {
  item: string;
  value: number;
  type: ContentType;
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
  text?: string;
  option1?: string;
  option2?: string;
  option3?: string;
}

export interface Additional {
  id: string;
  title: string;
  description: string;
  value: number;
  text?: string;
  text2?: string;
  text3?: string;
}

export interface Decoration {
  id: string;
  title: string;
  description: string;
  photosUrl: string;
  value: number;
  mainPhoto: Asset;
  additionalPhotos: Asset[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  photosUrl: string;
  value: number;
  mainPhoto: Asset;
  additionalPhotos: Asset[];
}

export interface Reception {
  id: string;
  title: string;
  description: string;
  photosUrl: string;
  value: number;
  mainPhoto: Asset;
  additionalPhotos: Asset[];
}

export interface GooglePhoto {
  id: string;
  productUrl: string;
  baseUrl: string;
}
export interface GooglePhotoResponse {
  mediaItems: GooglePhoto[];
}
