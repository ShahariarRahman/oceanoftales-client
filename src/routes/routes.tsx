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
        element: <BookDetails />,
      },
      {
        path: "/add-new-book",
        element: <AddBook />,
      },
      {
        path: "/edit-book",
        element: <EditBook />,
      },
      {
        path: "/reading-book",
        element: <ReadingList />,
      },
      {
        path: "/wishlist-book",
        element: <Wishlist />,
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
