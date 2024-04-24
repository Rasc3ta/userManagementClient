import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddUser from "./AddUser.jsx";
import Root from "./Root.jsx";
import UpdateUser from "./UpdateUser.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    loader: () =>
      fetch(
        "https://user-management-server-mosharof-hossains-projects.vercel.app/users"
      ),
    children: [
      {
        path: "/",
        element: <App></App>,
      },
      {
        path: "/addUser",
        element: <AddUser></AddUser>,
      },
      {
        path: "/updateUser",
        element: <UpdateUser></UpdateUser>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </React.StrictMode>
);
