import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Classes from "../Pages/Classes/Classes";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "instructor",
            element: <Instructors></Instructors>
        },
        {
          path: "classes",
          element: <Classes></Classes>
        },
        {
          path: "login",
          element: <Login></Login>
        },
        {
          path: "register",
          element: <Register></Register>
        }
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // admin routes 
      {
        path: "admin-home",
        element: "home"
      },
      {
        path: "manage-classes",
        element: <ManageClasses></ManageClasses>
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>
      },
      // Instructor routes 
      {
        path: "instructor-home",
        element: 'instructor home'
      },
      {
        path: "add-class",
        element: <AddClass></AddClass>
      },
      {
        path: "my-classes",
        element: 'my classes'
      }
    ]
  }
]);

export default router;