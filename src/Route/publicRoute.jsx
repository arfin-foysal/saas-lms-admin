

import {
  authUser,
  authUserToken,

} from "../utils/Auth";
import { Navigate } from "react-router-dom";
import Login from './../app/publicPages/login/Login';
import Test from './../app/publicPages/commonViews/Test';
import NotAccess from './../app/publicPages/commonViews/NotAccess';
import Error from './../app/publicPages/commonViews/Error';





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
