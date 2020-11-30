import React from "react";
import { Routes } from "./Routes";
import { Provider } from 'react-redux';
import store from "./store/store";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <Provider store={store}>  
      <Routes />
    </Provider>
  );
};
