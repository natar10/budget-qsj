import React, { Suspense } from "react";
import { Router } from "@reach/router";
import { AppContextProvider } from "../context/AppContext";

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import MenuOption from "../pages/MenuOption";
import DecorationOption from "../pages/DecorationOption";
import Decoration from "../pages/Decoration";
import Services from "../pages/Services";
import Reception from "../pages/Reception";
import SideMenu from "./SideMenu";

const App = () => {
  return (
    <Suspense fallback="loading">
      <AppContextProvider>
        <Router>
          <Home exact path="/" />
          <Menu exact path="/menu" />
          <MenuOption exact path="/menu/:menuId" />
          <Decoration exact path="decoration" />
          <DecorationOption exact path="decoration/:decorationId" />
          <Services exact path="/services" />
          <Reception exact path="/reception" />
        </Router>
      </AppContextProvider>
    </Suspense>
  );
};

export default App;
