export interface IGuardianReq {
  name: string;
  email: string;
  password: string;
  cellNumber: string;
}

export interface IGuardianLogin {
  email: string;
  password: string;
}

export interface IGuardianUpdateReq {
  name: string;
  email: string;
  password: string;
  cellNumber: string;
}
