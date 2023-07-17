import { AiOutlineUserAdd } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsMenuButtonWide } from "react-icons/bs";
import { RiUserSettingsLine, } from "react-icons/ri";

import { GoOrganization } from 'react-icons/go';








export const navItem = [
  
  {
  title:"Menu Setup",
  link: "menu-list",
  role: "GlobalAdmin",
  icon: <BsMenuButtonWide />,
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



];
