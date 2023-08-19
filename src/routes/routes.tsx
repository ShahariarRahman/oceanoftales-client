import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";
import Books from "@/pages/Books";
import BookDetails from "@/pages/BookDetails";
import EditBook from "@/pages/EditBook";
import AddBook from "@/pages/AddBook";
import ReadingList from "@/pages/ReadingList";
import Wishlist from "@/pages/Wishlist";
import PrivateRoute from "./PrivateRoute";
import FinishList from "@/pages/FinishList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddBook />,
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoute>
            <EditBook />,
          </PrivateRoute>
        ),
      },
      {
        path: "/reading-book",
        element: (
          <PrivateRoute>
            <ReadingList />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist-book",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/finished-book",
        element: (
          <PrivateRoute>
            <FinishList />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
