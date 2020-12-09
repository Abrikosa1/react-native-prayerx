import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

interface IProps {}

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC<IProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        options={{
          headerTitle: "Sign In"
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Sign Up"
        }}
        name="Register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;