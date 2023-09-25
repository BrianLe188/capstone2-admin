/* eslint-disable @typescript-eslint/no-explicit-any */
export type Menu = {
  _id: string;
  key: string;
  name: string;
  position: string;
  values: {
    id: string;
    name: string;
    path: string;
    icon?: any;
    angle_down?: any;
    angle_up?: any;
    children?: {
      id: string;
      name: string;
      path: string;
      iconChildren?: any;
      angle_down_Children?: any;
      angle_up_Children?: any;
    }[];
  }[];
};

export type Module = {
  id: string;
  key: string;
  name: string;
  path: string;
  icon: string;
};

export type Subject = {
  id: string;
  name: string;
};
