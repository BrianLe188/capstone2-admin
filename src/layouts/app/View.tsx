import Sidebar from "@/components/sidebar";
import { GlobalContext } from "@/contexts/globalContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { type Menu } from "@/utils/responseTypes";

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
    },
  ],
};

const View = () => {
  const { getMenusByPosition } = useContext(GlobalContext);
  const menus = getMenusByPosition("");

  return (
    <div className="grid col-12">
      <Sidebar className="w-20rem" data={menus || defaultMenu} />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default View;
