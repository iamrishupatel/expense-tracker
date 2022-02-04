import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./lib/firebase";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import "artemis-ui/dist/index.css";
import "./styles/global.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
