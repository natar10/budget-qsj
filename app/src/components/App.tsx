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
import Resume from "../pages/Resume";
import Brunch from "../pages/Brunch";
import Ceremony from "../pages/Ceremony";
import CeremonyOption from "../pages/CeremonyOption";
import { Loading } from "./Loading";

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AppContextProvider>
        <Router>
          <Menu exact path="/" />
          <Home exact path="/home" />
          <Menu exact path="/menu" />
          <MenuOption exact path="/menu/:menuId" />
          <Decoration exact path="decoration" />
          <DecorationOption exact path="decoration/:decorationId" />
          <Services exact path="/services" />
          <Reception exact path="/reception" />
          <Resume exact path="/resume" />
          <Brunch exact path="/brunch" />
          <Ceremony exact path="/ceremony" />
          <CeremonyOption exact path="ceremony/:decorationId" />
        </Router>
      </AppContextProvider>
    </Suspense>
  );
};

export default App;
