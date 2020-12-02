import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types';

const user: User = {
  id: 1,
  email: '',
  name: '',
  token: '',
}

const UsersSlice = createSlice({
  name: 'usersData',
  initialState: user,
  reducers: {
    // addUser(state, action) {
    //   state.push({ 
    //     email: action.payload.email, 
    //     password: action.payload.password 
    //   })
    // },
    setCurrentUser(state, action) {
      state.id = action.payload.id
      state.email = action.payload.email
      state.name = action.payload.name
      state.token = action.payload.token
    }
  }
});

export const { setCurrentUser } = UsersSlice.actions;

export default UsersSlice.reducer;