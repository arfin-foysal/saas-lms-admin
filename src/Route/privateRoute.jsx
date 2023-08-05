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
import ScriptContentList from "../app/views/scriptContentList/ScriptContentList";
import QuizList from "../app/views/quizList/QuizList";
import QuizQuestionList from './../app/views/quizQuestionList/QuizQuestionList';
import WebsitePageList from "../app/views/websitePageList/WebsitePageList";
import CourseList from "../app/views/courseList/CourseList";
import CourseOutlineList from "../app/views/courseOutlineList/CourseOutlineList";
import ContentList from "../app/views/contentList/ContentList";
import ContentOutlineList from "../app/views/contentOutlineList/ContentOutlineList";
import CourseFaqList from "../app/views/courseFaqList/CourseFaqList";
import CourseFeatureList from "../app/views/courseFeatureList/CourseFeatureList";
import CourseRoutineList from "../app/views/courseRoutineList/CourseRoutineList";
import CourseMentorList from "../app/views/courseMentorList/courseMentorList";

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
    element: <DashboardHomePage />,
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
    path: "script-content-list",
    element: <ScriptContentList />,
    role: "GlobalAdmin",
  },
  {
    path: "quiz-list",
    element: <QuizList />,
    role: "GlobalAdmin",
  },
  {
    path: "client-list",
    element: <ClientList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/website-page-list/:id",
    element: <WebsitePageList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/quiz-question-list/:id",
    element: <QuizQuestionList/>,
    role: "GlobalAdmin",
  },
  {
    path: "course-list",
    element: <CourseList/>,
    role: "GlobalAdmin",
  },
  {
    path: "content-list",
    element: <ContentList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/course-outline-list/:id",
    element: <CourseOutlineList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/content-outline-list/:id",
    element: <ContentOutlineList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/course-faq-list/:id",
    element: <CourseFaqList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/course-feature-list/:id",
    element: <CourseFeatureList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/course-routine-list/:id",
    element: <CourseRoutineList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/course-mentor-assign-list/:id",
    element: <CourseMentorList/>,
    role: "GlobalAdmin",
  },
];
