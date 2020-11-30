export type List = {
  id: string;
  title: string;
}

export type Task = {
  id: string;
  listId: string;
  title: string;
  description: string;
  username: string;
  complete: boolean;
  createTime: string;
}

export type SubscribedTask = {
  id: string;
  title: string;
  complete: boolean;
}

export type Comment = {
  id: string;
  taskId: string;
  text: string;
  author: string;
  createTime: string;
}

export type Data = {
  lists: Array<List>;
  tasks: Array<Task>;
  comments: Array<Comment>;
}

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type Users = {
  users: Array<User>;
  currentUser: User;
}

export type State = {
  data: Data;
  user: Users;
}