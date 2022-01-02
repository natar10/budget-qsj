import React, { createContext, useContext, useState } from "react";
import { ContextState, LoadingStatus, UserData } from "../common/types";

const AppContext = createContext<ContextState>({
  status: "LOADING",
  userData: null,
  total: 0,
  selectedItems: [],
});

const Provider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<LoadingStatus>("LOADING");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const context: ContextState = {
    status: loading,
    userData,
    total,
    selectedItems,
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
