import { ITeacherCreate, ITeacherLogin } from "../../interfaces/teachers";
import { IStudentsCreate } from "../../interfaces/students";
import { IGuardianLogin, IGuardianReq } from "../../interfaces/guardians";

interface ITeacherUpdateTest {
  name?: string;
  email?: string;
  password?: string;
  subject?: string;
  bio?: string;
}

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

export const mockedUpdateTeacher: ITeacherUpdateTest = {
  subject: "React JS",
};

export const mockedStudent: IStudentsCreate = {
  name: "FelipeJR",
  email: "felipejr@kenzie.com",
  password: "123456",
  age: 12,
};

export const mockedSecondStudent: IStudentsCreate = {
  name: "João",
  email: "joão@kenzie.com",
  password: "123456",
  age: 14,
};

export const mockedGuadian: IGuardianReq = {
  name: "Pai",
  email: "pai@kenzie.com",
  password: "123456",
  cellNumber: "998765432",
};

export const mockedGuadianLogin: IGuardianLogin = {
  email: "felipe@kenzie.com",
  password: "123456",
};
