import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { List, State, Task, Comment, Data } from '../types';


const list0Id = uuidv4(),
      list1Id = uuidv4(),
      list2Id = uuidv4(),
      list3Id = uuidv4();

const task0Id = uuidv4(),
      task1Id = uuidv4(),
      task2Id = uuidv4(),
      task3Id = uuidv4(),
      task4Id = uuidv4(),
      task5Id = uuidv4(),
      task6Id = uuidv4();

const cooment0Id = uuidv4(),
      cooment1Id = uuidv4(),
      cooment2Id = uuidv4(),
      cooment3Id = uuidv4(),
      cooment4Id = uuidv4(),
      cooment5Id = uuidv4();

const date = new Date().toTimeString();

const initialComments: Array<Comment> = [
  { id: cooment0Id, taskId: task0Id, text: 'Hey, Hey!', author: "Anna Barber", createTime: date }, 
  { id: cooment1Id, taskId: task0Id, text: 'How you doing?', author: "Hanna Barber", createTime: date }, 
  { id: cooment2Id, taskId: task0Id, text: 'Hi!', author: "Gloria Barber", createTime: date }, 
  { id: cooment3Id, taskId: task4Id, text: 'Just hello! Just how are you?', author: "Some Barber", createTime: date }, 
  { id: cooment5Id, taskId: task6Id, text: 'Ok.', author: "Shop Barber", createTime: date }, 
]


const initialTasks: Array<Task> = [
  { id: task0Id, listId: list1Id, title: 'В магз за едой', description: "Не забыть пельмени", username: "vasya", complete: false, createTime: date }, 
  { id: task1Id, listId: list1Id, title: 'Приготовить', description: "Описание Описание Описание Описание Описание Описание Описание", username: "vasya", complete: true, createTime: date }, 
  { id: task2Id, listId: list1Id, title: 'Съесть', description: "Съееесть", username: "Вомбат", complete: true, createTime: date },
  { id: task3Id, listId: list0Id, title: 'Все', description: "Кайфовать, в общем", username: "dsfafw", complete: true, createTime: date },
  { id: task4Id, listId: list0Id, title: 'Ку-ку', description: "Да-да, куку", username: "Вомбат", complete: false, createTime: date }, 
  { id: task5Id, listId: list0Id, title: 'Задачка', description: "И кто-то должен ее сделать", username: "Не вомбат", complete: true, createTime: date }, 
  { id: task6Id, listId: list0Id, title: 'Еще одна', description: "И эту тоже", username: "Вомбат", complete: false, createTime: date },
]
const initialLists: Array<List> = [
  { id: list0Id, title: 'TODO' },
  { id: list1Id, title: 'In Progress' },
  { id: list2Id, title: 'Testing' },
  { id: list3Id, title: 'Done' },
]

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
    putData(state, action) {
      state.lists = action.payload;
    },
    addList(state, action) {
      state.lists.push({ id: uuidv4(), title: action.payload })
    },
    deleteList(state, action) {
      state.lists
    },
    addTask(state, action) {
      state.tasks.push({ 
        id: uuidv4(), 
        listId: action.payload.listId, 
        title: action.payload.title, 
        description: '' ,
        username: action.payload.username,
        complete: false,
        createTime: new Date().toLocaleString() 
      })
    },

    removeTask(state, action) {
      for (let i = 0; i < state.tasks.length; i++)
        if (state.tasks[i].id === action.payload) {
          state.tasks.splice(i,1);
          break;
      }
    },
    addComment(state, action) {
      state.comments.push({ 
        id: uuidv4(), 
        taskId: action.payload.taskId, 
        text: action.payload.text, 
        author: action.payload.author, 
        createTime: new Date().toLocaleString() 
      })
    },
  }
});

export const { loadData, putData, addList, removeTask, addComment, addTask } = DataSlice.actions;

export default DataSlice.reducer;