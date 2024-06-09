import { IArt } from "./arts";

export interface IUser {
  isAuthenticated: boolean;
  token: string | null;
  userInfo: any;
  myId: string;
  isLoading: IIsLoading;
  isError: IIsError;
}
type IIsError = 'error' | null
type IIsLoading = 'idle' | 'loading'

export interface IRegisterUser {
  firstName: string;
  email: string;
  password: string;
}
export interface ILogin {
  email: string;
  password: string;
}

//

export interface IUserProfile {
  _id: string;
  firstName: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  followers: IFollowers;
  subscriptions: ISubscriptions;
  arts: IArts;
}

interface IFollowers {
  count: number;
  users: IUserProfile[];
}

interface ISubscriptions {
  count: number;
  users: IUser[];
}

interface IArts {
  count: number;
  items: IArt[];
}





