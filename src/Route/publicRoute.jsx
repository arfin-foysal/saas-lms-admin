

import {
  authUser,
  authUserToken,

} from "../utils/Auth";
import { Navigate } from "react-router-dom";
import Login from './../app/publicPages/login/Login';
import Test from './../app/publicPages/common/Test';
import NotAccess from './../app/publicPages/common/NotAccess';
import Error from './../app/publicPages/common/Error';





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
  //   path: "/signup",
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
