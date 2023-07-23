import { Navigate } from "react-router-dom";
import { getPath } from "./utils";
import DashboardHomePage from "../app/views/dashboardHomePage/DashboardHomePage";
import MenuList from "../app/views/menuSetup/MenuList";
import OrganizationList from "../app/views/organization/OrganizationList";
import ClassList from "../app/views/classList/ClassList";
import SubjectList from "../app/views/subjectList/SubjectList";
import ChapterList from "../app/views/chapterList/ChapterList";
import ClientList from './../app/views/clientList/ClientList';
import VideoContentList from "../app/views/videoContentList/VideoContentList";

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
  },
  {
    path: "class-list",
    element: <ClassList />,
    role: "GlobalAdmin",
  },
  {
    path: "subject-list",
    element: <SubjectList />,
    role: "GlobalAdmin",
  },
  {
    path: "chapter-list",
    element: <ChapterList />,
    role: "GlobalAdmin",
  },
  {
    path: "video-content-list",
    element: <VideoContentList />,
    role: "GlobalAdmin",
  },
  {
    path: "client-list",
    element: <ClientList/>,
    role: "GlobalAdmin",
  },

 
];
