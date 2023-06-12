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
import MyClass from "../Pages/Dashboard/MyClass/MyClass";
import PrivateRoute from "./PrivateRoute";
import SelectedClass from "../Pages/Dashboard/SelectedClass/SelectedClass";
import Payment from "../Pages/Dashboard/Payment/Payment";

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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
        element: <MyClass></MyClass>
      },
      // students route
      {
        path: "my-selected-classes",
        element: <SelectedClass></SelectedClass>
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
        loader: ({params}) => fetch(`http://localhost:5000/card-class/${params.id}`)
      }
    ]
  }
]);

export default router;