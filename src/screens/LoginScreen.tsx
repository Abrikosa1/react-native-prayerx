import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AuthStackParamList } from '../navigators/AuthStack';
import { setErrors } from '../store/LoginSlice';
import { getLoginInfo } from '../store/selectors';
import { userSagaActions } from '../store/UsersSagas/userSagaActions';
import { initStyles } from '../styles';

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
      type: userSagaActions.SIGN_IN.type, 
      payload: {email: user.email, password: user.password}
    });
  };


  return (
    <>
      <Text style={initStyles.heading}>LOGIN</Text>
      <View style={styles.container}>
        <TextInput
          style={initStyles.input}
          placeholder="Email..."
          keyboardType={'email-address'}
          underlineColorAndroid="transparent"
          onChangeText={email => setUser(user => ({...user, email: email}))}
        />
        <TextInput
          style={initStyles.input}
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
          style={initStyles.button}
          onPress={handlePressLogin}
        >
          <Text style={initStyles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[initStyles.button, styles.createAccounBtn]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[initStyles.buttonText, styles.createAccounBtnText]}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
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
  createAccounBtn: {
    borderWidth: 1,
    borderColor: '#BFB393',
    backgroundColor: '#FFF',
    marginTop: 15,
  },
  createAccounBtnText: {
    color: '#514D47',
  },
  warn: {
    color: 'red',
    alignSelf: 'center'
  },
});
export default LoginScreen;