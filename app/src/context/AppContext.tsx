import { ContentfulClientApi } from "contentful";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ContextState,
  LoadingStatus,
  SelectedItem,
  UserData,
} from "../common/types";
import { isCategorySelected } from "../common/functions";
import { createClient } from "../services/contentful";

const AppContext = createContext<ContextState>({
  status: "LOADING",
  userData: null,
  total: 0,
  selectedUniqueItems: [],
  selectedVariousItems: [],
  contentfulClient: null,
});

const Provider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<LoadingStatus>("LOADING");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [contentfulClient, setContentfulClient] =
    useState<ContentfulClientApi | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [selectedUniqueItems, setSelectedUniqueItems] = useState<
    SelectedItem[]
  >([]);
  const [selectedVariousItems, setSelectedVariousItems] = useState<
    SelectedItem[]
  >([]);

  useEffect(() => {
    setContentfulClient(createClient());
  }, []);

  useEffect(() => {
    const reducer = (acc: number, item: SelectedItem) => acc + item.value;
    const uniqueTotal = selectedUniqueItems.reduce(reducer, 0);
    const variousTotal = selectedVariousItems.reduce(reducer, 0);
    setTotal(uniqueTotal + variousTotal);
  }, [selectedUniqueItems, selectedVariousItems]);

  const context: ContextState = {
    status: loading,
    userData,
    total,
    selectedUniqueItems,
    selectedVariousItems,
    contentfulClient,
    setData: (userData: UserData) => setUserData(userData),
    selectUniqueItems: (item: SelectedItem) => {
      const previouslySelected = isCategorySelected(
        item.type,
        selectedUniqueItems
      )
        ? selectedUniqueItems.filter(
            (selectedItem) => selectedItem.type !== item.type
          )
        : selectedUniqueItems;
      setSelectedUniqueItems([...previouslySelected, item]);
    },
    selectVariousItems: (item: SelectedItem) => {
      setSelectedVariousItems([...selectedVariousItems, item]);
    },
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const AppContextProvider = Provider;

export function useAppContext() {
  return useContext(AppContext);
}
