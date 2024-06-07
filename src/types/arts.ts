
interface User {
  followers: {
    count: number;
    users: any[]; // Замените any на конкретный тип, если известно
  };
  subscriptions: {
    count: number;
    users: any[]; // Замените any на конкретный тип, если известно
  };
  _id: string;
  firstName: string;
  email: string;
  password: string;
  avatarUrl: string;
  arts: any[]; // Замените any на конкретный тип, если известно
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Like {
  count: number;
  users: any[]; // Замените any на конкретный тип, если известно
}
interface Comment {
  count: number;
  commentList: any[]; // Замените any на конкретный тип, если известно
}

export interface IArt {
  likes: Like;
  comments: Comment;
  _id: string;
  title: string;
  text: string;
  viewsCount: number;
  room: string;
  imageUrl: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


type isLoading = 'loading' | 'idle'
type isError = 'error' | null
export type IChangeArtstoLike = { art: IArt, userId: string }

export interface IArtsSlice {
  arts: IArt[] | [],
  popularArts: IArt[] | [],
  isLoading: isLoading,
  isError: isError
}