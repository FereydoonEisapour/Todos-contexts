import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container);
console.log('<Index /> renderd');
root.render(
   <React.StrictMode>
         <Provider store={store}>
              <App />
         </Provider>

   </React.StrictMode>
);
