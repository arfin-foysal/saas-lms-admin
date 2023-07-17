import { Navigate } from "react-router-dom";
import { getPath } from "./utils";
import DashboardHomePage from "../app/views/dashboardHomePage/DashboardHomePage";
import MenuList from "../app/views/menuSetup/MenuList";
import OrganizationList from "../app/views/organization/OrganizationList";









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
  {
    path: "menu-list",
    element: <MenuList />,
    role: "GlobalAdmin",
  },
  {
    path: "organization-list",
    element: <OrganizationList />,
    role: "GlobalAdmin",
  }

 
];
