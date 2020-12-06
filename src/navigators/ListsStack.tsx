import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet} from "react-native";
import TasksScreen from "../screens/TasksScreen";
import TaskScreen from "../screens/TaskScreen";
import AddListModal from "../components/AddListModal";
import ListsScreen from "../screens/ListsScreen";
import ColumnSettingsScreen from "../screens/ColumnSettingsScreen";
import SubscribedScreen from "../screens/SubscribedScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PrayIcon from 'react-native-vector-icons/FontAwesome5'; 
import SettingsIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Feather";
import ListTabNavigator from "./ListTabNavigator";


interface HomeStackProps {}

const Stack = createStackNavigator();

export const ListsStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="ListsScreen" >
       <Stack.Screen 
        name='TaskScreen' 
        component={TaskScreen} 
        options={{
          headerTitle: '',
          headerRight: () => <PrayIcon style={styles.taskHeaderIcon} name={'praying-hands'} size={22} color="#FFF" />,
          headerStyle: styles.taskHeader,
          headerTitleStyle: styles.taskHeaderText,
          headerTitleAlign: 'left',
          headerTintColor: '#FFF',
        }} 
      />
      <Stack.Screen
        options={({ navigation, route }: any) => ({
          headerTitle: route.params.list.title,
          headerTitleAlign: 'center',
          headerStyle: styles.listScreenHeader,
          headerTitleStyle: styles.listScrenHeaderText,
          headerRight: () => {
            return (
              <SettingsIcon 
              style={styles.settingsIcon} 
              name={'settings'} size={24} 
              color="#72A8BC" 
              onPress={() => 
                navigation.navigate('ColumnSettingsScreen', {
                  title: route.params.list.title,
                  id: route.params.list.id
              })}/>
            )
          }
        })}
        name="ListTabNavigator"
        component={ListTabNavigator}
      />
      <Stack.Screen 
      name="ColumnSettingsScreen" 
      component={ColumnSettingsScreen}
      options={({ navigation, route }: any) => ({
          headerTitle: 'Settings',
          headerTitleAlign: 'center'
      })}
      />
      <Stack.Screen
        name="ListsScreen"
        options={({ navigation, route }) => ({
          headerTitle: 'My Desk',
          headerRight: () => <Icon style={styles.headerAddIcon} name={'plus'} size={16} color="#72A8BC" onPress={() => navigation.navigate('AddListModal')}/> ,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTitleAlign: 'center',
        })} 
        component={ListsScreen}
      />
      <Stack.Screen name='AddListModal' component={AddListModal} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 20.29,
    fontFamily: 'SFUIText-Regular',
  },
  headerAddIcon: {
    position: 'absolute',
    right: 15,
  },
  listScreenHeader: {
    height: 64,
    //borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  listScrenHeaderText: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 20.29,
    fontFamily: 'SFUIText-Regular',
  },
  list: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderColor: '#E5E5E5',
    height: 58,
    borderWidth: 1,
    borderRadius: 4,
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 17, 
    lineHeight: 20.29,
    color: '#514D47',
    fontFamily: 'SFUIText-Regular',
  },
  container: {

  },
  settingsIcon: {
    marginRight: 15
  },
  taskHeader: {
    backgroundColor: '#BFB393',
    height: 65,
    borderBottomColor: '#BFB393',
    elevation: 0, 
    shadowOpacity: 0, 
  },
  taskHeaderText: {
    color: '#FFF',
    alignSelf: 'flex-end',
    fontFamily: 'SFUIText-Regular',
  },
  taskHeaderIcon: {
    marginRight: 15
  }
});
