import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ///authToken: '',
  //isFetching: false,
  error: false,
  errorMessage: ''
}

const LoginSlice = createSlice({
  name: 'loginData',
  initialState: initialState,
  reducers: {
    setErrors(state, action) { 
      state.error = action.payload.error;
      state.errorMessage = action.payload.errorMessage;
    }
  }
});

export const { setErrors } = LoginSlice.actions;

export default LoginSlice.reducer;