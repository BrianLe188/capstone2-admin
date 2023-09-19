/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, createContext, useEffect, useState } from "react";
import { type Menu } from "@/utils/responseTypes";

interface IGlobalContext {
  menus: Array<any>;
  getMenusByPosition: (p: string) => Menu | undefined;
}

const defaultValues: IGlobalContext = {
  menus: [],
  getMenusByPosition: () => undefined,
};

export const GlobalContext = createContext(defaultValues);

const GlobalContextProvider = ({ children }: { children: ReactElement }) => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    getMenus;
  }, []);

  const getMenus = async () => {
    setMenus([]);
  };

  const getMenusByPosition = (position: string) => {
    return menus.find((menu: any) => menu.position === position);
  };

  return (
    <GlobalContext.Provider
      value={{
        menus,
        getMenusByPosition,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
