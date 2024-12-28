import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./app/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Pages
import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import Signup from "./pages/Signup.jsx";
import { Login, ProtectedLayout } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <ProtectedLayout authentication={false}>
            <Login />
          </ProtectedLayout>
        ),
      },{
        path: "/signup",
        element: (
          <ProtectedLayout authentication={false}>
            <Signup />
          </ProtectedLayout>
        ),
      },
      {
        path: "/all-post",
        element: (
          <ProtectedLayout authentication>
            <AllPosts />
          </ProtectedLayout>
        ),
      },{
        path: "/add-post",
        element: (
          <ProtectedLayout authentication>
            <AddPost />
          </ProtectedLayout>
        ),
      },{
        path: "/edit/post/:slug",
        element: (
          <ProtectedLayout authentication>
            <EditPost />
          </ProtectedLayout>
        ),
      },{
        path:"/post/:slug",
        element: <Post />
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
