import { privateRoute } from "./privateRoute";
import { user } from "./utils";
import { Navigate } from "react-router-dom";
import Layout from './../app/layouts/dashboardLayout/Layout';

const ProtectRoute = ({ r, children }) => {
  if (user.token === "" || user.role === "") {
    // return <Navigate to={"/login"} replace />;
    // return window.location.replace(`${process.env.REACT_APP_FONTEND_URL}login`);
    return window.location.replace(`${window.location.origin}/`);
  }

  if (user) {
    if (r.role === user.role || r.role === "all") {
      return children;
    } else {
      return <Navigate to={"/not-access"} />;
    }
  } else {
    return <Navigate to={"/"} replace />;
  }
};


export const getRoute = () => {
  const filterRoute = [];

  privateRoute.map((r) => {
    r.element = <ProtectRoute r={r}>{r.element}</ProtectRoute>;
    filterRoute.push(r);
  });
  return {
    path: "/dashboard",
    element: <Layout />,
    children: filterRoute,
  };
};
