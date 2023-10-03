// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type } from "os";

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

export type SubjectBlock = {
  id: string;
  name: string;
  subjects: Array<string>;
};

export type MemberSchool = {
  id: string;
  name: string;
  link: string;
  university: boolean;
  afterUniversity: boolean;
};

export type User = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: Partial<Role>;
};

export type Role = {
  id: string;
  name: string;
};

export type Subject = {
  id: string;
  name: string;
};

export type Majors = {
  id: string;
  name: string;
  industryCode: string;
  specializedCode: string;
  educationLevel: Partial<Level>;
};

export type Level = {
  id: string;
  level: string;
};
