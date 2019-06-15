import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
//
import App from "./components/App";
import reset from "./styling/reset.js";
import basis from "./styling/basis.js";

ReactDOM.render(<App />, document.getElementById("root"));

// Global styles
injectGlobal`${reset}${basis}`;
