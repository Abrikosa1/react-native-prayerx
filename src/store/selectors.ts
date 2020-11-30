import { State } from "../types";

export const selectCurrentUsername = (state: State) => state.user.currentUser;

export const selectTasksByListId = (listId: string) => 
  (state: State) => state.data.tasks.filter(task => task.listId === listId);

export const selectCommentsByTaskId = (taskId: string) => 
  (state: State) => state.data.comments.filter(comment => comment.taskId === taskId);

export const selectLists = (state: State) => state.data.lists;