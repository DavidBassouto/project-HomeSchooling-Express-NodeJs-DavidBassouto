import { ITeacherCreate, ITeacherLogin } from "../../interfaces/teachers";
import { IStudentsCreate } from "../../interfaces/students";

export const mockedTeacher: ITeacherCreate = {
  name: "Felipe",
  email: "felipe@kenzie.com",
  password: "123456",
  subject: "Node JS",
  bio: "Projeto HomeSchooling",
};

export const mockedTeacherLogin: ITeacherLogin = {
  email: "felipe@kenzie.com",
  password: "123456",
};

export const mockedTeacherInvalidLogin: ITeacherLogin = {
  email: "fel@kenzie.com",
  password: "12345",
};

export const mockedStudent: IStudentsCreate = {
  name: "FelipeJR",
  email: "felipejr@kenzie.com",
  password: "123456",
  age: 12,
};
