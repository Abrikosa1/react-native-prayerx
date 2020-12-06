import React from "react";
import Routes from "./Routes";
import { Provider } from 'react-redux';
import store from "./store/store";

interface IProps {}

export const Providers: React.FC<IProps> = ({}) => {
  return (
    <Provider store={store}>  
      <Routes />
    </Provider>
  );
};
