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
  removeVariousItems?: (item: SelectedItem) => void;
};

export interface Props {
  path: string;
  exact?: boolean;
}

export type ContentType = "menu" | "service" | "decoration" | "reception";
export interface SelectedItem {
  type: ContentType;
  product: Menu | Decoration | Service | Additional | Reception;
}

export interface UserData {
  eventType: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  quantity: number;
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
  calculate: boolean;
}

export interface Additional {
  id: string;
  title: string;
  description: string;
  value: number;
  text?: string;
  text2?: string;
  text3?: string;
  calculate: boolean;
}

export interface Decoration {
  id: string;
  title: string;
  description: string;
  banquet: string;
  exterior: string;
  ceremony: string;
  photosUrl: string;
  value: number;
  mainPhoto: Asset;
  additionalPhotos: Asset[];
  calculate: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  photosUrl: string;
  value: number;
  mainPhoto: Asset;
  additionalPhotos: Asset[];
  calculate: boolean;
}

export interface Reception {
  id: string;
  title: string;
  description: string;
  photosUrl: string;
  value: number;
  mainPhoto: Asset;
  additionalPhotos: Asset[];
  calculate: boolean;
}

export interface GooglePhoto {
  id: string;
  productUrl: string;
  baseUrl: string;
}
export interface GooglePhotoResponse {
  mediaItems: GooglePhoto[];
}
