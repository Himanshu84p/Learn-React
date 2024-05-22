import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Home from "./pages/Home.jsx";
import { AuthLayout } from "./components/index.js";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route
        path="login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route
        path="all-posts"
        element={
          <AuthLayout authentication>
            {" "}
            <AllPost />
          </AuthLayout>
        }
      />
      <Route
        path="add-posts"
        element={
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="edit-post/:slug"
        element={
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        }
      />
      <Route path="post/:slug" element={<Post />} />
    </Route>
  ),
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
