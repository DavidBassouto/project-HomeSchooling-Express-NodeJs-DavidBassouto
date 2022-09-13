export interface ITeacherCreate {
  name: string;
  email: string;
  password: string;
  subject: string;
  bio: string;
}

export interface ITeacherLogin {
  email: string;
  password: string;
}

export interface ITeacherUpdate {
  name: string;
  email: string;
  password: string;
  subject: string;
  bio: string;
}
