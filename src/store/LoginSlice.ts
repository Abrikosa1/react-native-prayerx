import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginData } from '../types';

const initialState: LoginData = {
  ///authToken: '',
  //isFetching: false,
  error: false,
  errorMessage: ''
}

const LoginSlice = createSlice({
  name: 'loginData',
  initialState: initialState,
  reducers: {
    setErrors(state, action: PayloadAction<{error: boolean, errorMessage: string}>) { 
      state.error = action.payload.error;
      state.errorMessage = action.payload.errorMessage;
    }
  }
});

export const { setErrors } = LoginSlice.actions;

export default LoginSlice.reducer;