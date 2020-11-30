import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './DataSlice';
import usersReducer from './UsersSlice';

const rootReducer = combineReducers({
  data: dataReducer,
  user: usersReducer 
})


export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>


