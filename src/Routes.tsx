import React, { useState, useEffect, useContext } from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer, RouteProp } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthStack } from "./AuthStack";
import { State, User } from "./types";
import { shallowEqual, useSelector } from "react-redux";
import { ListsStack } from "./ListsStack";


interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  //const { user, login } = useContext(AuthContext);
  //const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const selectCurrentUser = (state: State) => state.user;
  const user = useSelector(selectCurrentUser, shallowEqual);
  useEffect(() => {
    
    if(user) {
      setLoading(false);
    }

  }, [user]);

  if (loading) {
    return (
        <ActivityIndicator size="large" />
    );
  }
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF'
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      {user.token ? <ListsStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
