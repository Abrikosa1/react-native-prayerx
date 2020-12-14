import { createAction } from "@reduxjs/toolkit";

export const userSagaActions = {
  SIGN_IN: createAction<{email: string, password: string}>('SIGN_IN'),
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: createAction<{email: string, name: string, password: string}>('SIGN_UP'),
};
