
import Error from "../app/pages/commonViews/Error";
import NotAccess from "../app/pages/commonViews/NotAccess";
import Test from "../app/pages/commonViews/Test";
import Login from "../app/pages/commonViews/login/Login";
import {
  authUser,
  authUserToken,

} from "../utils/Auth";
import { Navigate } from "react-router-dom";





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
