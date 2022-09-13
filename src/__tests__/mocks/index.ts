import { ITeacherCreate, ITeacherLogin } from "../../interfaces/teachers";
import { IStudentsCreate, IStudentsLogin } from "../../interfaces/students";
import { IGuardianLogin, IGuardianReq } from "../../interfaces/guardians";
import { IClassCreate } from "../../interfaces/classes";

interface ITeacherUpdateTest {
  name?: string;
  email?: string;
  password?: string;
  subject?: string;
  bio?: string;
}

interface IGuardianUpdateTest {
  name?: string;
  email?: string;
  password?: string;
  cellNumber?: string;
}

interface IStudentUpdateTest {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
}

interface IClassUpdateTest {
  name?: string;
  hour?: string;
  isOpen?: boolean;
}

export const mockedTeacher: ITeacherCreate = {
  name: "Felipe",
  email: "felipe@kenzie.com",
  password: "123456",
  subject: "Node JS",
  bio: "Projeto HomeSchooling",
};

export const mockedSecondTeacher: ITeacherCreate = {
  name: "Felipe2",
  email: "felipe2@kenzie.com",
  password: "123456",
  subject: "Node JS",
  bio: "Projeto HomeSchooling",
};

export const mockedTeacherLogin: ITeacherLogin = {
  email: "felipe@kenzie.com",
  password: "123456",
};

export const mockedSecondTeacherLogin: ITeacherLogin = {
  email: "felipe2@kenzie.com",
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

export const mockedStudentLogin: IStudentsLogin = {
  email: "felipejr@kenzie.com",
  password: "123456",
};

export const mockedStudentInvalidLogin: IStudentsLogin = {
  email: "felipejr@kenzie.com",
  password: "12345",
};

export const mockedUpdateStudent: IStudentUpdateTest = {
  age: 13,
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

export const mockedSecondGuardian: IGuardianReq = {
  name: "Pai2",
  email: "pai2@kenzie.com",
  password: "123456",
  cellNumber: "998765432",
};

export const mockedThirdGuardian: IGuardianReq = {
  name: "Pai3",
  email: "pai3@kenzie.com",
  password: "123456",
  cellNumber: "998765432",
};

export const mockedUpdateGuadian: IGuardianUpdateTest = {
  cellNumber: "234567899",
};

export const mockedGuadianLogin: IGuardianLogin = {
  email: "pai@kenzie.com",
  password: "123456",
};

export const mockedGuadianInvalidLogin: IGuardianLogin = {
  email: "pai@kenzie.com",
  password: "12345",
};

export const mockedSecondGuadianLogin: IGuardianLogin = {
  email: "pai2@kenzie.com",
  password: "123456",
};

export const mockedThirdGuadianLogin: IGuardianLogin = {
  email: "pai3@kenzie.com",
  password: "123456",
};

export const mockedClass: IClassCreate = {
  name: "Classe A",
  hour: "09:00",
};

export const mockedUpdateClass: IClassUpdateTest = {
  isOpen: false,
};
