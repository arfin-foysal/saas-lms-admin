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
import MentorList from "../app/views/mentorList/MentorList";
import StudentList from "../app/views/studentList/StudentList";
import StudentMappingList from "../app/views/studentMappingList/studentMappingList";
import Tags from "../app/views/tags/Tags";
import StudentParticipantsList from "../app/views/studentParticipantsList/StudentParticipantsList";
import ExamResultList from "../app/views/ExamResultList/ExamResultList";
import PaymentList from "../app/views/paymentList/PaymentList";
import PurchaseList from "../app/views/purchaseList/PurchaseList";
import AssignmentList from "../app/views/assignmentList/AssignmentList";
import QuizSubjectList from "../app/views/quizSubjectList/QuizSubjectList";
import QuizWrittenQuestionList from "../app/views/quizWrittenQuestion/QuizWrittenQuestionList";
import EnrollMentList from "../app/views/enrollMentList/EnrollMentList";

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
    path: "schooladmin",
    element: <DashboardHomePage/>,
    role: "SchoolAdmin",
  },
  {
    path: "menu-list",
    element: <MenuList />,
    role: "SchoolAdmin",
  },
  {
    path: "organization-list",
    element: <OrganizationList />,
    role: "SchoolAdmin",
  },
  {
    path: "tag-list",
    element: <Tags />,
    role: "SchoolAdmin",
  },
  {
    path: "class-list",
    element: <ClassList />,
    role: "SchoolAdmin",
  },
  {
    path: "subject-list",
    element: <SubjectList />,
    role: "SchoolAdmin",
  },
  {
    path: "chapter-list",
    element: <ChapterList />,
    role: "SchoolAdmin",
  },
  {
    path: "video-content-list",
    element: <VideoContentList />,
    role: "SchoolAdmin",
  },
  {
    path: "script-content-list",
    element: <ScriptContentList />,
    role: "SchoolAdmin",
  },
  {
    path: "quiz-list",
    element: <QuizList />,
    role: "SchoolAdmin",
  },
  // {
  //   path: "client-list",
  //   element: <ClientList />,
  //   role: "SchoolAdmin",
  // },
  {
    path: "schooladmin/website-page-list/:id",
    element: <WebsitePageList />,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/quiz-subject-list/:id",
    element: <QuizSubjectList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/quiz-question-list/:id",
    element: <QuizQuestionList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/written-question-list/:id",
    element: <QuizWrittenQuestionList/>,
    role: "SchoolAdmin",
  },
  {
    path: "course-list",
    element: <CourseList/>,
    role: "SchoolAdmin",
  },
  {
    path: "content-list",
    element: <ContentList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/course-outline-list/:id",
    element: <CourseOutlineList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/content-outline-list/:id",
    element: <ContentOutlineList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/course-faq-list/:id",
    element: <CourseFaqList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/course-feature-list/:id",
    element: <CourseFeatureList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/course-routine-list/:id",
    element: <CourseRoutineList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/course-mentor-assign-list/:id",
    element: <CourseMentorList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/student-list-by-course-id/:id",
    element: <StudentParticipantsList/>,
    role: "SchoolAdmin",
  },
  {
    path: "mentor-list",
    element: <MentorList/>,
    role: "SchoolAdmin",
  },
  {
    path: "student-list",
    element: <StudentList/>,
    role: "SchoolAdmin",
  },
  {
    path: "student-mapping-list",
    element: <StudentMappingList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/assignment-list",
    element: <AssignmentList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/exam-result-list",
    element: <ExamResultList/>,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/payment-list",
    element: <PaymentList />,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/purchase-list",
    element: <PurchaseList />,
    role: "SchoolAdmin",
  },
  {
    path: "schooladmin/enrollment-list",
    element: <EnrollMentList />,
    role: "SchoolAdmin",
  },



  // Global Admin
  {
    path: "globaladmin",
    element: <DashboardHomePage />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/menu-list",
    element: <MenuList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/organization-list",
    element: <OrganizationList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/tag-list",
    element: <Tags />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/class-list",
    element: <ClassList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/subject-list",
    element: <SubjectList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/chapter-list",
    element: <ChapterList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/video-content-list",
    element: <VideoContentList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/script-content-list",
    element: <ScriptContentList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/quiz-list",
    element: <QuizList />,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/client-list",
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
    path: "globaladmin/course-list",
    element: <CourseList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/content-list",
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
  {
    path: "globaladmin/student-list-by-course-id/:id",
    element: <StudentParticipantsList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/mentor-list",
    element: <MentorList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/student-list",
    element: <StudentList/>,
    role: "GlobalAdmin",
  },
  {
    path: "globaladmin/student-mapping-list",
    element: <StudentMappingList/>,
    role: "GlobalAdmin",
  },
];
