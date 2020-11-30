import { createSlice } from '@reduxjs/toolkit'
import { User, Users } from '../types';
import { v4 as uuidv4 } from 'uuid';



const user0Id = uuidv4(),
      user1Id = uuidv4();

const initialUsers: Array<User> = [
  {id:user0Id, username: 'Admin', email: 'email@mail.ru', password: '123'},
  {id:user1Id, username: 'Moderator', email: 'email@mail.ru', password: '111'},
]

const initialCurrentUser: User = {
  id: '',
  username: '',
  email: '',
  password: ''
};

const UsersData: Users = {
  users: initialUsers,
  currentUser: initialCurrentUser
}

const UsersSlice = createSlice({
  name: 'usersData',
  initialState: UsersData,
  reducers: {
    addUser(state, action) {
      state.users.push({ 
        id: uuidv4(), 
        username: action.payload.username, 
        email: action.payload.email, 
        password: action.payload.password 
      })
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload
    }
  }
});

export const { addUser, setCurrentUser } = UsersSlice.actions;

export default UsersSlice.reducer;