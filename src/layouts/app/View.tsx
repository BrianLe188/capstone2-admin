import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { GlobalContext } from "@/contexts/globalContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import type { Menu } from "@/utils/responseTypes";
import { menu, angleDown } from "../../assets/index";

const defaultMenu: Menu = {
  _id: "1",
  key: "sidebar",
  name: "sidebar",
  position: "sidebar",
  values: [
    {
      id: "1",
      name: "Dashboard",
      path: "/",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "10",
      name: "Application",
      path: "/application",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "2",
      name: "Modules",
      path: "/modules",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "3",
      name: "SubjectBlock",
      path: "/subject-block",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "4",
      name: "Member School",
      path: "/member-school",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "5",
      name: "Subject",
      path: "/subject",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "6",
      name: "User",
      path: "/user",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "7",
      name: "Majors",
      path: "/majors",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "8",
      name: "File",
      path: "/file",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "9",
      name: "Sub major",
      path: "/sub-majors",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "11",
      name: "Rules",
      path: "/rules",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
    {
      id: "12",
      name: "Certificates",
      path: "/certificates",
      icon: menu,
      angle_down: angleDown,
      children: [],
    },
  ],
};

const View = () => {
  const { getMenusByPosition } = useContext(GlobalContext);
  const menus = getMenusByPosition("");

  return (
    <div className="w-full bg-gray-300">
      <Navbar />
      <div className="grid grid-cols-12 h-[calc(100vh-85px)] mt-3 mx-3 pb-3 gap-3">
        <div className="col-span-3">
          <Sidebar data={menus || defaultMenu} />
        </div>
        <div className="col-span-9 bg-white rounded-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default View;
