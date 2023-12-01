import { createBrowserRouter } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import Root from "./Routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "movies/:movieId/:top",
            element: <Home />,
          },
        ],
      },
      {
        path: "tv",
        element: <Tv />,
        children: [
          {
            path: ":id/:top",
            element: <Tv />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
        children: [
          {
            path: ":movieId",
            element: <Search />,
          },
        ],
      },
    ],
  },
]);

export default router;
