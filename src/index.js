import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./authContext/AuthContext";
import { FavouriteProvider } from "./favouriteContext/FavouriteContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FavouriteProvider>
        <App />
      </FavouriteProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
