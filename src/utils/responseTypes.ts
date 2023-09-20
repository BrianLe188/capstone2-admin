export type Menu = {
  _id: string;
  key: string;
  name: string;
  position: string;
  // eslint-disable-next-line
  values: { id: string; name: string; path: string; icon?: any; angle_down?: any; angle_up?: any; 
    // eslint-disable-next-line
    children?: { id: string; name: string; path: string; iconChildren?: any; angle_down_Children?: any; angle_up_Children?: any; }[];
  }[];
};
