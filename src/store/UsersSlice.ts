import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types';

const user: User = {
  id: null,
  email: '',
  name: '',
  token: '',
}

const UsersSlice = createSlice({
  name: 'usersData',
  initialState: user,
  reducers: {
    setCurrentUser(state, action: PayloadAction<{id: number, email: string, name: string, token: string}>) {
      state.id = action.payload.id
      state.email = action.payload.email
      state.name = action.payload.name
      state.token = action.payload.token
    }
  }
});

export const { setCurrentUser } = UsersSlice.actions;

export default UsersSlice.reducer;