export interface IUser {
  isAuthenticated: boolean;
  token: string | null;
  userInfo: any;
}

export interface IRegisterUser {
  firstName: string;
  email: string;
  password: string;
}
export interface ILogin {
  email: string;
  password: string;
}