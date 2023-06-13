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
import UpdateClass from "../Pages/Dashboard/UpdateClass/UpdateClass";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import EnrolledClass from "../Pages/Dashboard/EnrolledClass/EnrolledClass";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";

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
        element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      // Instructor routes 
      {
        path: "instructor-home",
        element: 'instructor home'
      },
      {
        path: "add-class",
        element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
      },
      {
        path: "update-class/:id",
        element: <InstructorRoute><UpdateClass></UpdateClass></InstructorRoute>
      },
      {
        path: "my-classes",
        element: <InstructorRoute><MyClass></MyClass></InstructorRoute>
      },
      // students route
      {
        path: "my-selected-classes",
        element: <SelectedClass></SelectedClass>
      },
      {
        path: "my-enrolled-classes",
        element: <EnrolledClass></EnrolledClass>
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
        loader: ({params}) => fetch(`http://localhost:5000/card-class/${params.id}`)
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>
      }
    ]
  }
]);

export default router;