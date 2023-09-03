import { BiBook, BiCategory, BiPurchaseTag, BiSolidRightArrowAlt, BiUser } from "react-icons/bi";
import { BsGear, BsMenuButtonWide } from "react-icons/bs";
import { LiaUserEditSolid, LiaUserGraduateSolid } from "react-icons/lia";
import { MdAssignment, MdOutlineAssignment, MdOutlinePayment } from "react-icons/md";


export const navItem = [

  // {
  //   title: "Menu Setup",
  //   link: "menu-list",
  //   role: "GlobalAdmin",
  //   icon: <BsMenuButtonWide size={13} />,
  // },
  {
    title: "Mentor List",
    link: "globaladmin/mentor-list",
    role: "GlobalAdmin",
    icon: <LiaUserEditSolid size={17} />,
  },
  {
    title: "Student List",
    link: "globaladmin/student-list",
    role: "GlobalAdmin",
    icon: <LiaUserGraduateSolid size={18} />,
  },
  // {
  //   title: "Master Settings",
  //   role: "GlobalAdmin",
  //   icon: <BsGear size={14} />,
  //   children: [
  //     {
  //       title: "Organization List",
  //       link: "organization-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //     {
  //       title: "Tag List",
  //       link: "tag-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //     {
  //       title: "User List",
  //       link: "user-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //   ],
  // },
  // {
  //   title: "Row Content",
  //   role: "GlobalAdmin",
  //   icon: <BiCategory />,
  //   children: [
  //     {
  //       title: "Class List",
  //       link: "class-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //     {
  //       title: "Subject List",
  //       link: "subject-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //     {
  //       title: "Chapter List",
  //       link: "chapter-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //     {
  //       title: "Video Content List",
  //       link: "video-content-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //     {
  //       title: "Script Content List",
  //       link: "script-content-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //     {
  //       title: "Quiz List",
  //       link: "quiz-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //   ],
  // },
  // {
  //   title: "Course Setup",
  //   role: "GlobalAdmin",
  //   icon: <BiCategory />,
  //   children: [
  //     {
  //       title: "Course List",
  //       link: "course-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //     {
  //       title: "Student Mapping List",
  //       link: "student-mapping-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },

  //   ],
  // },
  // {
  //   title: "Content Setup",
  //   role: "GlobalAdmin",
  //   icon: <BiCategory />,
  //   children: [
  //     {
  //       title: "Content List",
  //       link: "content-list",
  //       role: "GlobalAdmin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //   ],
  // },
  // {
  //   title: "Exam Result List",
  //   link: "exam-result-list",
  //   role: "GlobalAdmin",
  //   icon: <BiBook />,
  // },

  {
    title: "Client List",
    link: "globaladmin/client-list",
    role: "GlobalAdmin",
    icon: <BiUser />,
  },

  //Admin
  {
    title: "Menu Setup",
    link: "menu-list",
    role: "SchoolAdmin",
    icon: <BsMenuButtonWide size={13} />,
  },
  {
    title: "Mentor List",
    link: "mentor-list",
    role: "SchoolAdmin",
    icon: <LiaUserEditSolid size={17} />,
  },
  {
    title: "Student List",
    link: "student-list",
    role: "SchoolAdmin",
    icon: <LiaUserGraduateSolid size={18} />,
  },
  {
    title: "Master Settings",
    role: "SchoolAdmin",
    icon: <BsGear size={14} />,
    children: [
      {
        title: "Organization List",
        link: "organization-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Tag List",
        link: "tag-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "User List",
        link: "user-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
    ],
  },
  {
    title: "Row Content",
    role: "SchoolAdmin",
    icon: <BiCategory />,
    children: [
      {
        title: "Class List",
        link: "class-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Subject List",
        link: "subject-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Chapter List",
        link: "chapter-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Video Content List",
        link: "video-content-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Script Content List",
        link: "script-content-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Quiz List",
        link: "quiz-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
    ],
  },
  {
    title: "Course Setup",
    role: "SchoolAdmin",
    icon: <BiCategory />,
    children: [
      {
        title: "Course List",
        link: "course-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Student Mapping List",
        link: "student-mapping-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },

    ],
  },
  {
    title: "Content Setup",
    role: "SchoolAdmin",
    icon: <BiCategory />,
    children: [
      {
        title: "Content List",
        link: "content-list",
        role: "SchoolAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
    ],
  }, {
    title: "Assignment List",
    link: "schooladmin/assignment-list",
    role: "SchoolAdmin",
    icon: <MdOutlineAssignment/>,
  },
  {
    title: "Exam Result List",
    link: "schooladmin/exam-result-list",
    role: "SchoolAdmin",
    icon: <BiBook />,
  },
  {
    title: "Payment List",
    link: "schooladmin/payment-list",
    role: "SchoolAdmin",
    icon: <MdOutlinePayment />,
  },

  {
    title: "Purchase List",
    link: "schooladmin/purchase-list",
    role: "SchoolAdmin",
    icon: <BiPurchaseTag />,
  },


];
