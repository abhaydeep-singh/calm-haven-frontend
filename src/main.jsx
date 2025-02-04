import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  ChatHelper,
  Home,
  Login,
  Register,
  ChatUser,
  Blog,
  ArticleDetails,
  LoginHelper,
  HelperDashboard,
  CreateArticle,
} from "./pages/index.js";
import Protected from "./utils/Protected.jsx";
import AptHelper from "./pages/AptHelper.jsx";
import AptUser from "./pages/AptUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // refer outlet
    children: [
      {
        path: "/",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/helper-login",
        element: <LoginHelper />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/chat-helper",
        element: (
          <Protected>
            <ChatHelper />
          </Protected>
        ),
      },
      {
        path: "/chat-user",
        element: (
          <Protected>
            <ChatUser />
          </Protected>
        ),
      },
      {
        path: "/blog",
        element: (
          <Protected>
            <Blog />
          </Protected>
        ),
      },
      {
        path: "/article/:id",
        element: (
          <Protected>
            <ArticleDetails />
          </Protected>
        ),
      },
      {
        path: "/book-appointment",
        element: (
          <Protected>
            <AptUser />
          </Protected>
        ),
      },


      // ----------------------------------------------for helper------------------------------------------------------
      {
        path: "/helper-dashboard",
        element: (
          <Protected>
            <HelperDashboard />
          </Protected>
        ), 
        children: [
          {
            // TODO: Important
            // nested routes should use relative path(that dont start with /)
            path: "create-article",
            element: (
              <Protected>
                <CreateArticle />
              </Protected>
            ),
          },
          {
            path: "check-appointment",
            element: (
              <Protected>
                <AptHelper />
              </Protected>
            ),
          },
          {
            path: "chat-helper",
            element: (
              <Protected>
                <ChatHelper/>
              </Protected>
            ),
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
