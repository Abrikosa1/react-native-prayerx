import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";


import { useDispatch } from "react-redux";
import { AuthNavProps } from "../params/AuthParamList";
import { userSagaActions } from "../store/UsersSagas/userSagaActions";
import { User } from "../types";

const RegisterScreen = React.memo(({ navigation, route }: AuthNavProps<"Register">) => {
  const dispatch = useDispatch();
  const [showWarn, setShowWarn] = useState(false);
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: ''
  });
  const register = () => {
    if(user.name && user.email && user.password) {
      dispatch({type: userSagaActions.SIGN_UP, payload: user});
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
        size={25}
        color="#AC5253"
        onPress={() => {
          navigation.pop();
        }}
      />
      <Text style={styles.heading}>Registration</Text>
      <View style={styles.registerView}>
        <TextInput
          style={[styles.input, (showWarn && user.name==='') && styles.alertInput]}
          placeholder="Username..."
          underlineColorAndroid="transparent"
          onChangeText={username => setUser(user => ({...user, name: username}))}
        />
        <TextInput
          style={[styles.input, (showWarn && user.email==='') && styles.alertInput]}
          placeholder="Email..."
          keyboardType={'email-address'}
          underlineColorAndroid="transparent"
          onChangeText={email => setUser(user => ({...user, email: email}))}
        />
        <TextInput
          style={[styles.input, (showWarn && user.password==='') && styles.alertInput]}
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
      </View>
    </>
  );
});


const styles = StyleSheet.create({
  registerView: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32,
    alignSelf: 'center',
    marginTop: 25,
    textTransform: 'uppercase',
    fontFamily: 'SFUIText-Semibold',
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
  alertInput: {
    borderColor: '#AC5253',
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

export default RegisterScreen;