import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './DataSlice';
import usersReducer from './UsersSlice';
import loginReducer from './LoginSlice';

const rootReducer = combineReducers({
  data: dataReducer,
  user: usersReducer,
  loginData: loginReducer, 
})


export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>


