import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import UserProvider from "./root/UserProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <RouterProvider router={routes} />
      </UserProvider>
    </Provider>
  </React.StrictMode>,
);
