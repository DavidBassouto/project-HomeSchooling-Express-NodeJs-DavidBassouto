export interface IStudentsCreate {
  name: string;
  email: string;
  password: string;
  age?: number;
}

export interface IStudentsLogin {
  email: string;
  password: string;
}
