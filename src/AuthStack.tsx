import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Icon from 'react-native-vector-icons/EvilIcons';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addUser, setCurrentUser } from "./store/UsersSlice";
import { State, User } from "./types";
import { AuthNavProps, AuthParamList } from "./params/AuthParamList";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>({
    id: '',
    username: '',
    email: '',
    password: ''
  });
  const selectUser = (state: State) => state.user.users;
  const registeredUsers = useSelector(selectUser, shallowEqual);

  const login = () => {
    for (let i = 0; i < registeredUsers.length; i++)
      if (registeredUsers[i].username === user.username && registeredUsers[i].password === user.password) {
      dispatch(setCurrentUser(registeredUsers[i]));
      break;
    }
  };

  return (
    <>
      <Text style={styles.heading}>LOGIN</Text>
      <View style={styles.registerView}>
        <TextInput
          style={styles.input}
          placeholder="Username..."
          underlineColorAndroid="transparent"
          onChangeText={username => setUser(user => ({...user, username: username}))}
        />
        <TextInput
          style={styles.input}
          placeholder="Password..."
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          onChangeText={password => setUser(user => ({...user, password: password}))}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={login}
        >
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccounBtn}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.createAccounBtnText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const Register = React.memo(({ navigation, route }: AuthNavProps<"Register">) => {
  const dispatch = useDispatch();
  const [showWarn, setShowWarn] = useState(false);
  const [user, setUser] = useState<User>({
    id: '',
    username: '',
    email: '',
    password: ''
  });
  const register = () => {
    if(user.username && user.email && user.password) {
      dispatch(addUser(user));
      navigation.navigate("Login");
    }
    else {
      setShowWarn(true);
      setTimeout(() => setShowWarn(false), 3000);
    }
  }
  return (
    <>
      <Icon
        style={styles.closeIcon}
        name={'close'}
        size={40}
        color="#AC5253"
        onPress={() => {
          navigation.pop();
        }}
      />
      <Text style={styles.heading}>Registration</Text>
      <View style={styles.registerView}>
        <TextInput
          style={styles.input}
          placeholder="Username..."
          underlineColorAndroid="transparent"
          onChangeText={username => setUser(user => ({...user, username: username}))}
        />
        <TextInput
          style={styles.input}
          placeholder="Email..."
          keyboardType={'email-address'}
          underlineColorAndroid="transparent"
          onChangeText={email => setUser(user => ({...user, email: email}))}
        />
        <TextInput
          style={styles.input}
          placeholder="Password..."
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          onChangeText={password => setUser(user => ({...user, password: password}))}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={register}
        >
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        {showWarn && <Text style={styles.warn}>Enter all data...</Text>}
      </View>
    </>
  );
});

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
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
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTitle: "Sign Up"
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  registerView: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32,
    alignSelf: 'center',
    marginTop: 48,
    textTransform: 'uppercase',
  },
  input: { 
    fontSize: 14,
    height: 50, 
    borderColor: '#E5E5E5', 
    borderRadius: 10,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
    borderWidth: 1,
  },
  button: {
    height: 30,
    backgroundColor: '#BFB393',
    borderRadius: 15,
    marginRight: 15,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  createAccounBtn: {
    height: 30,
    borderWidth: 1,
    borderColor: '#BFB393',
    borderRadius: 15,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccounBtnText: {
    textTransform: 'uppercase',
    color: '#000',
  },
  warn: {
    color: 'red',
    alignSelf: 'center'
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },

});

