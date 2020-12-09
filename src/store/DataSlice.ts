import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Comment, Data, List, Task } from '../types';


const state: Data = {
  lists: [],
  tasks: [],
  comments: []
}

const DataSlice = createSlice({
  name: 'data',
  initialState: state,
  reducers: {
    putLists(state, action: PayloadAction<Array<List>>) {
      state.lists = action.payload;
    },
    putTasks(state, action: PayloadAction<Array<Task>>) {
      state.tasks = action.payload;
    },
    putComments(state, action: PayloadAction<Array<Comment>>) {
      state.comments = action.payload;
    },
  }
});

export const { putLists, putTasks, putComments} = DataSlice.actions;

export default DataSlice.reducer;