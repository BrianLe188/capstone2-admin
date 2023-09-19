export type Menu = {
  _id: string;
  key: string;
  name: string;
  position: string;
  values: { id: string; name: string; path: string }[];
};
