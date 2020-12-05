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
// export type Task = {
//   id: string;
//   listId: string;
//   title: string;
//   description: string;
//   username: string;
//   complete: boolean;
//   createTime: string;
// }

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
// export type Comment = {
//   id: string;
//   taskId: string;
//   text: string;
//   author: string;
//   createTime: string;
// }

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

export type State = {
  data: Data;
  user: User;
}