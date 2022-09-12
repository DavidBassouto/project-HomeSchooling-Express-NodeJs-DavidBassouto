export interface IStudentsCreate {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface IStudentLogin {
  email: string;
  password: string;
}
