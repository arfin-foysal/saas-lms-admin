import { AiOutlineUserAdd } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { RiUserSettingsLine, } from "react-icons/ri";








export const navItem = [{
  title: "Master Settings",
  role: "GlobalAdmin",
  icon: <RiUserSettingsLine />,
  children: [

    {
      title: "Category List",
      link: "category-list",
      role: "GlobalAdmin",
      icon: <BiCategory />,
    },
    {
      title: "Sub Category List",
      link: "sub-category-list",
      role: "GlobalAdmin",
      icon: <BiCategory />,
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
