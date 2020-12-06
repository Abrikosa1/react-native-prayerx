import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useDispatch } from 'react-redux';
import { userSagaActions } from '../store/UsersSagas/userSagaActions';

const LoginScreen: React.FC = ({ navigation }: any)  => {
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
    fontFamily: 'SFUIText-Bold',
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
});
export default LoginScreen;