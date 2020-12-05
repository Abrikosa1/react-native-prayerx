import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Icon from 'react-native-vector-icons/EvilIcons';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./store/UsersSlice";
import { State, User } from "./types";
import { AuthNavProps, AuthParamList } from "./params/AuthParamList";
import { loadData } from "./store/DataSlice";

import { userSagaActions } from "./store/UsersSagas/userSagaActions";
import { dataSagaActions } from "./store/DataSagas/dataSagaActions";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });


  const login = () => {
    dispatch({type: userSagaActions.SIGN_IN, payload: {email: user.email, password: user.password}});
  };

  return (
    <>
      <Text style={styles.heading}>LOGIN</Text>
      <View style={styles.registerView}>
        <TextInput
          style={styles.input}
          placeholder="Email..."
          underlineColorAndroid="transparent"
          onChangeText={email => setUser(user => ({...user, email: email}))}
        />
        <TextInput
          style={styles.input}
          placeholder="Password..."
          underlineColorAndroid="transparent"
          keyboardType={'email-address'}
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
    id: 0,
    email: '',
    name: '',
    token: ''
  });
  const register = () => {
    // if(user.username && user.email && user.password) {
    //   dispatch(addUser(user));
    //   navigation.navigate("Login");
    // }
    // else {
    //   setShowWarn(true);
    //   setTimeout(() => setShowWarn(false), 3000);
    // }
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
    fontFamily: 'SFUIText-Regular',
    //fontWeight: '800'
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
    fontFamily: 'SFUIText-Regular'
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
    fontFamily: 'SFUIText-Regular'
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

