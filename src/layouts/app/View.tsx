import Sidebar from "@/components/sidebar";
import { GlobalContext } from "@/contexts/globalContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { type Menu } from "@/utils/responseTypes";
import { user, menu, angleDown } from "../../assets/index";

const defaultMenu: Menu = {
  _id: "1",
  key: "sidebar",
  name: "sidebar",
  position: "sidebar",
  values: [
    {
      id: "1",
      name: "Menus",
      path: "/menus",
      icon: menu,
      angle_down: angleDown,
      children:[
        {
          id: "1",
          name: "Users",
          path: "/menus",
          iconChildren: user,
          angle_down_Children: angleDown,
        },
        {
          id: "2",
          name: "Users",
          path: "/menus",
          iconChildren: user,
          angle_down_Children: angleDown,
        },
        {
          id: "3",
          name: "Users",
          path: "/menus",
          iconChildren: user,
          angle_down_Children: angleDown,
        },
      ]
    },
    {
      id: "2",
      name: "Users",
      path: "/menus",
      icon: user,
      angle_down: angleDown,
    },
    {
      id: "23",
      name: "Users",
      path: "/menus",
      icon: user,
    },
  ],
};

const View = () => {
  const { getMenusByPosition } = useContext(GlobalContext);
  const menus = getMenusByPosition("");

  return (
    <div className="grid col-12 ml-2">
      <Sidebar className="w-20rem" data={menus || defaultMenu} />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default View;
