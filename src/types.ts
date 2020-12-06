export type List = {
  id: number;
  title: string;
}

export type Task = {
  id: number,
  title: string,
  description: string,
  checked: boolean,
  columnId: number
} 

export type SubscribedTask = {
  id: number;
  title: string;
  complete: boolean;
}

export type Comment = {
  id: number;
  body: string;
  created: Date;
  cardId: number;
  userId: number;
}

export type Data = {
  lists: Array<List>;
  tasks: Array<Task>;
  comments: Array<Comment>;
}

export type User = {
  id: number;
  email: string;
  name: string;
  token: string;
}

export type LoginData = {
  error: boolean;
  errorMessage: string;
}

export type State = {
  data: Data;
  user: User;
  loginData: LoginData;
}