import { State } from "../types";

export const selectCurrentUsername = (state: State) => state.user;

export const selectTasksByListId = (listId: number) => 
  (state: State) => state.data.tasks.filter(task => task.columnId === listId);

export const selectCommentsByTaskId = (taskId: number) => 
  (state: State) => state.data.comments.filter(comment => comment.cardId === taskId);

export const selectLists = (state: State) => state.data.lists;

export const getLoginInfo = (state: State) => state.loginData;