import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { shallowEqual, useSelector } from "react-redux";
import MainStack from "./navigators/MainStack";
import AuthStack from "./navigators/AuthStack";
import { selectCurrentUser } from './store/selectors';

interface IProps {}

const Routes: React.FC<IProps> = React.memo(({}) => {
  
  const user = useSelector(selectCurrentUser, shallowEqual);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF'
    }
  };

  return (
    <NavigationContainer theme={MyTheme}>
      {user.token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
});

export default Routes;