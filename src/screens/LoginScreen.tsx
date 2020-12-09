import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AuthStackParamList } from '../navigators/AuthStack';
import { setErrors } from '../store/LoginSlice';
import { getLoginInfo } from '../store/selectors';
import { userSagaActions } from '../store/UsersSagas/userSagaActions';

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface IProps {
  navigation: LoginScreenNavigationProp
}

const LoginScreen: React.FC<IProps> = React.memo(({ navigation })  => {
  const dispatch = useDispatch();
  const loginData = useSelector(getLoginInfo, shallowEqual);

  const [user, setUser] = useState<{email: string, password: string}>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showWarn, setShowWarn] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    if(loginData.error) {
      setShowWarn(true);
    //setTimeout(() => setShowWarn(false), 3000);
      dispatch(setErrors({error: false, errorMessage: ""}));
    }
  }, [loginData])

  useEffect(() => {
    setShowWarn(false)
  }, [user])

  const handlePressLogin = () => {
    setLoading(true);
    dispatch({
      type: userSagaActions.SIGN_IN, 
      payload: {email: user.email, password: user.password}
    });
  };


  return (
    <>
      <Text style={styles.heading}>LOGIN</Text>
      <View style={styles.registerView}>
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
        {showWarn && <View style={styles.errorMessage}>
          <Text style={styles.errorMessageText}>Login failed: Invalid email or password</Text>
        </View>}
        {(loading && !showWarn) && <ActivityIndicator style={{marginBottom: 20}} size="large" color="#BFB393"/>}
        <TouchableOpacity
          style={styles.button}
          onPress={handlePressLogin}
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
  alertView: {
    borderColor: '#AC5253',
  },
  errorMessage: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  errorMessageText: {
    color: '#AC5253',
    fontFamily: 'SFUIText-Regular'
  },
  button: {
    height: 30,
    backgroundColor: '#BFB393',
    borderRadius: 15,
    marginRight: 15,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'SFUIText-Regular'
  },
  warn: {
    color: 'red',
    alignSelf: 'center'
  },
});
export default LoginScreen;