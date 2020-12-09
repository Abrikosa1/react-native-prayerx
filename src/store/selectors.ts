import { State } from "../types";

export const selectCurrentUser = (state: State) => state.user;

export const selectCommentsByTaskId = (taskId: number) => 
  (state: State) => state.data.comments.filter(comment => comment.cardId === taskId);

export const selectListById = (listId: number) => 
  (state: State) => state.data.lists.filter(list => list.id === listId);

export const selectLists = (state: State) => state.data.lists;

export const getLoginInfo = (state: State) => state.loginData;

export const selectTasksByListId = (listId: number) => 
  (state: State) => state.data.tasks.filter(task => task.columnId === listId);

export const selectTaskById = (taskId: number) => 
  (state: State) => state.data.tasks.filter(task => task.id === taskId);

    