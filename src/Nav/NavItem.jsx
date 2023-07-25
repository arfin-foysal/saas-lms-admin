import { AiOutlineUserAdd } from "react-icons/ai";
import { BiBookContent, BiCategory, BiUser } from "react-icons/bi";
import { BsMenuButtonWide } from "react-icons/bs";
import { RiUserSettingsLine, } from "react-icons/ri";

import { GoOrganization } from 'react-icons/go';








export const navItem = [

  {
    title: "Menu Setup",
    link: "menu-list",
    role: "GlobalAdmin",
    icon: <BsMenuButtonWide />,
  },
  {
    title: "Content",
    role: "GlobalAdmin",
    icon: <BiCategory />,
    children: [
      {
        title: "Class List",
        link: "class-list",
        role: "GlobalAdmin",
        icon: <BiBookContent />,
      },
      {
        title: "Subject List",
        link: "subject-list",
        role: "GlobalAdmin",
        icon: <BiBookContent />,
      },
      {
        title: "Chapter List",
        link: "chapter-list",
        role: "GlobalAdmin",
        icon: <BiBookContent />,
      },
      {
        title: "Video Content List",
        link: "video-content-list",
        role: "GlobalAdmin",
        icon: <BiBookContent />,
      },
      {
        title: "Script Content List",
        link: "script-content-list",
        role: "GlobalAdmin",
        icon: <BiBookContent />,
      },
      {
        title: "Quiz List",
        link: "quiz-list",
        role: "GlobalAdmin",
        icon: <BiBookContent />,
      },
    ],
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
        icon: <GoOrganization />,
      },
      {
        title: "User List",
        link: "user-list",
        role: "GlobalAdmin",
        icon: <AiOutlineUserAdd />,
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
