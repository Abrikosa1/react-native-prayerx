import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { AuthStackParamList } from "../navigators/AuthStack";
import { userSagaActions } from "../store/UsersSagas/userSagaActions";
import { initStyles } from "../styles";

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;

interface IProps {
  navigation: RegisterScreenNavigationProp,
}

const RegisterScreen: React.FC<IProps> = React.memo(({ navigation }) => {
  const dispatch = useDispatch();
  const [showWarn, setShowWarn] = useState<boolean>(false);
  const [user, setUser] = useState<{email: string, name: string, password: string}>({
    email: '',
    name: '',
    password: ''
  });
  const register = () => {
    if(user.name && user.email && user.password) {
      dispatch({type: userSagaActions.SIGN_UP.type, payload: user});
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
      <Text style={initStyles.heading}>Registration</Text>
      <View style={styles.container}>
        <TextInput
          style={[initStyles.input, (showWarn && user.name==='') && styles.alertInput]}
          placeholder="Username..."
          underlineColorAndroid="transparent"
          onChangeText={username => setUser(user => ({...user, name: username}))}
        />
        <TextInput
          style={[initStyles.input, (showWarn && user.email==='') && styles.alertInput]}
          placeholder="Email..."
          keyboardType={'email-address'}
          underlineColorAndroid="transparent"
          onChangeText={email => setUser(user => ({...user, email: email}))}
        />
        <TextInput
          style={[initStyles.input, (showWarn && user.password==='') && styles.alertInput]}
          placeholder="Password..."
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          onChangeText={password => setUser(user => ({...user, password: password}))}
        />
        <TouchableOpacity
          style={initStyles.button}
          onPress={register}
        >
          <Text style={initStyles.buttonText}>Register</Text>
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
  alertInput: {
    borderColor: '#AC5253',
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