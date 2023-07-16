import { Navigate } from "react-router-dom";
import { getPath } from "./utils";
import DashboardHomePage from "../app/views/dashboardHomePage/DashboardHomePage";









export const privateRoute = [
  {
    path: "*",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },
  {
    path: "/dashboard",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },

  {
    path: "globaladmin",
    element: <DashboardHomePage/>,
    role: "GlobalAdmin",
  },

 
];
