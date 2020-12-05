import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Data } from '../types';


const state: Data = {
  lists: [],
  tasks: [],
  comments: []
}

const DataSlice = createSlice({
  name: 'data',
  initialState: state,
  reducers: {
    loadData(state, action) {
      state.lists = [];
    },
    putLists(state, action) {
      state.lists = action.payload;
    },
    putTasks(state, action) {
      state.tasks = action.payload;
    },
    putComments(state, action) {
      state.comments = action.payload;
    },
    deleteList(state, action) {
      state.lists
    }
  }
});

export const { loadData, putLists, putTasks, putComments} = DataSlice.actions;

export default DataSlice.reducer;