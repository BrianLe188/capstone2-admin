/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { type Menu } from "@/utils/responseTypes";
import UserService from "@/services/user";

interface IGlobalContext {
  menus: Array<any>;
  getMenusByPosition: (p: string) => Menu | undefined;
  auth: {
    id: string;
    email: string;
  };
  setToken: Dispatch<SetStateAction<string>>;
}

const defaultValues: IGlobalContext = {
  menus: [],
  getMenusByPosition: () => undefined,
  auth: {
    id: "",
    email: "",
  },
  setToken: () => {},
};

export const GlobalContext = createContext(defaultValues);

const GlobalContextProvider = ({ children }: { children: ReactElement }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [auth, setAuth] = useState({
    id: "",
    email: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    if (auth) {
      getMenus;
    }
  }, [auth]);

  useEffect(() => {
    getAuth();
  }, [token]);

  const getAuth = async () => {
    const v = (await UserService.verify()) as { id: string; email: string };
    if (v) {
      setAuth(v);
    }
  };

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
        auth,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
