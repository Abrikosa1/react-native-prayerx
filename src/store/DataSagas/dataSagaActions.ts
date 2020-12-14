import { createAction } from "@reduxjs/toolkit";
import { Comment, List, Task } from "../../types";

export const dataSagaActions = {
  LOAD_LISTS: createAction<{ token: string }>('LOAD_LISTS'),
  LOAD_TASKS: createAction<{ token: string }>('LOAD_TASKS'),
  LOAD_COMMENTS: createAction<{ token: string }>('LOAD_COMMENTS'),
  LOAD_DATA: createAction<{ token: string }>('LOAD_DATA'),
  ADD_LIST: createAction<{ token: string, newList: List }>('ADD_LIST'),
  ADD_TASK: createAction<{ token: string, newTask: Task }>('ADD_TASK'),
  ADD_COMMENT: createAction<{ cardId: number, token: string, newComment: Comment }>('ADD_COMMENT'),  
  REMOVE_LIST: createAction<{id: number, token: string }>('REMOVE_LIST'),
  REMOVE_TASK: createAction<{ id: number, token: string }>('REMOVE_TASK'),
  REMOVE_COMMENT: createAction<{ id: number, token: string }>('REMOVE_COMMENT'), 
  UPDATE_LIST: createAction<{id: number, token: string, newList: List }>('UPDATE_LIST'),
  UPDADE_TASK: createAction<{ taskId: number, token: string, newTask: Task }>('UPDADE_TASK'),
  UPDATE_COMMENT:createAction<{ commentId: number, token: string, newComment: Comment }>('UPDATE_COMMENT'),
};

