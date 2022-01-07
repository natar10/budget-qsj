import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles/global.scss";
import "./i18n";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.render(<App />, document.getElementById("app"));
