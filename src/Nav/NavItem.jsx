import { BiCategory, BiSolidRightArrowAlt, BiUser } from "react-icons/bi";
import { BsMenuButtonWide } from "react-icons/bs";
import { RiUserSettingsLine, } from "react-icons/ri";


export const navItem = [

  {
    title: "Menu Setup",
    link: "menu-list",
    role: "GlobalAdmin",
    icon: <BsMenuButtonWide size={13} />,
  },
  {
    title: "Master Settings",
    role: "GlobalAdmin",
    icon: <RiUserSettingsLine />,
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
      {
        title: "Content Outline List",
        link: "content-outline-list",
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
