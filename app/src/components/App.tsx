import React, { Suspense } from "react";
import { Router } from "@reach/router";
import { AppContextProvider } from "../context/AppContext";

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import MenuOption from "../pages/MenuOption";
import Decoration from "../pages/Decoration";
import Services from "../pages/Services";
import Reception from "../pages/Reception";
import SideMenu from "./SideMenu";

const App = () => {
  return (
    <Suspense fallback="loading">
      <SideMenu />
      <AppContextProvider>
        <Router>
          <Home path="/" />
          <Menu path="/menu" />
          <MenuOption path="/menu/:id" />
          <Decoration path="decoration" />
          <Decoration path="decoration/:id" />
          <Services path="/services" />
          <Reception path="/reception" />
        </Router>
      </AppContextProvider>
    </Suspense>
  );
};

export default App;
