import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { HashRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import store from "./store.js";
import { Provider } from "react-redux";

import { SnackbarProvider } from "notistack";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={3}
    autoHideDuration={3000}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
  >
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HashRouter>
  </SnackbarProvider>
);
