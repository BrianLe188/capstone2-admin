// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EFILE, ELEVEL } from "./enums";

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
  subjects: Array<Subject>;
};

export type MemberSchool = {
  id: string;
  name: string;
  link: string;
  university?: boolean;
  afterUniversity?: boolean;
  majors: Array<Majors>;
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
  code: string;
  educationalLevel: ELEVEL;
  basedOnHighSchoolExamResults: Array<SubjectBlock>;
  basedOnHighSchoolTranscripts: Array<SubjectBlock>;
  description: string;
};

export type File = {
  id: string;
  name: string;
  extension: EFILE;
  path: string;
};

export type SubMajor = {
  id: string;
  name: string;
  code: string;
  description: string;
  majorId: string;
  major: Majors;
};
