import { BiCategory, BiSolidRightArrowAlt, BiUser } from "react-icons/bi";
import { BsGear, BsMenuButtonWide } from "react-icons/bs";
import { LiaUserEditSolid, LiaUserGraduateSolid } from "react-icons/lia";


export const navItem = [

  {
    title: "Menu Setup",
    link: "menu-list",
    role: "GlobalAdmin",
    icon: <BsMenuButtonWide size={13} />,
  },
  {
    title: "Mentor List",
    link: "mentor-list",
    role: "GlobalAdmin",
    icon: <LiaUserEditSolid size={17} />,
  },
  {
    title: "Student List",
    link: "student-list",
    role: "GlobalAdmin",
    icon: <LiaUserGraduateSolid size={18} />,
  },
  {
    title: "Master Settings",
    role: "GlobalAdmin",
    icon: <BsGear size={14} />,
    children: [
      {
        title: "Organization List",
        link: "organization-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },

      {
        title: "User List",
        link: "user-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
    ],
  },
  {
    title: "Row Content",
    role: "GlobalAdmin",
    icon: <BiCategory />,
    children: [
      {
        title: "Class List",
        link: "class-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Subject List",
        link: "subject-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Chapter List",
        link: "chapter-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Video Content List",
        link: "video-content-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Script Content List",
        link: "script-content-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Quiz List",
        link: "quiz-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
    ],
  },
  {
    title: "Course Setup",
    role: "GlobalAdmin",
    icon: <BiCategory />,
    children: [
      {
        title: "Course List",
        link: "course-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },
      {
        title: "Student Mapping List",
        link: "student-mapping-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },

    ],
  },
  {
    title: "Content Setup",
    role: "GlobalAdmin",
    icon: <BiCategory />,
    children: [
      {
        title: "Content List",
        link: "content-list",
        role: "GlobalAdmin",
        icon: <BiSolidRightArrowAlt />,
      },

  


    ],
  },

  {
    title: "Client List",
    link: "client-list",
    role: "GlobalAdmin",
    icon: <BiUser />,
  },
];
