import { ContentfulClientApi } from "contentful";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ContextState, LoadingStatus, UserData } from "../common/types";
import { createClient } from "../services/contentful";

const AppContext = createContext<ContextState>({
  status: "LOADING",
  userData: null,
  total: 0,
  selectedItems: [],
  contentfulClient: null,
});

const Provider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<LoadingStatus>("LOADING");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [contentfulClient, setContentfulClient] =
    useState<ContentfulClientApi | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setContentfulClient(createClient());
  }, []);

  const context: ContextState = {
    status: loading,
    userData,
    total,
    selectedItems,
    contentfulClient,
    setData: (userData: UserData) => setUserData(userData),
    setTotal: (value: number) => setTotal(total + value),
    selectItems: (item: string) => setSelectedItems([...selectedItems, item]),
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const AppContextProvider = Provider;

export function useAppContext() {
  return useContext(AppContext);
}
