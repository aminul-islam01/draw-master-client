import {createBrowserRouter} from "react-router-dom";
import Test from "../Pages/Test/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Test></Test>,
  },
]);

export default router;