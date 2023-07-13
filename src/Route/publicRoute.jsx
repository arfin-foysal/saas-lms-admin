import Login from "../components/pages/login/Login";
// import Signup from "../components/client/views/signup/ClientSignup";
import {
  authUser,
  authUserToken,

} from "../utils/Auth";
import { Navigate } from "react-router-dom";

import NotAccess from "../components/pages/commonViews/NotAccess";
import Error from "../components/pages/commonViews/Error";
import Test from "../components/pages/commonViews/Test";



export const publicRoute = [

  //dashboard login

  {
    path: "/",
    element:
      authUser !== "" && authUserToken !== "" ? (
        <Navigate to={"/dashboard"} replace />
      ) : (
        <Login />
      ),
  },
  // {
  //   path: "/dashboard-signup",
  //   element:
  //     authUser !== "" && authUserToken !== "" ? (
  //       <Navigate to={"/dashboard"} replace />
  //     ) : (
  //       <Signup />
  //     ),
  // },

  {
    path: "test",
    element: <Test/>
  }
,
  {
    path: "/not-access",
    element: <NotAccess />,
  },
  {
    path: "*",
    element: <Error />,
  },
];
