import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
//
import App from "./components/App";
import reset from "./styling/reset.js";
import basis from "./styling/basis.js";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${basis}
`;

const Root = (
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>
);

ReactDOM.render(Root, document.getElementById("root"));
