import React from "react";
import { TouchableOpacity, Text, Button, StyleSheet, Alert } from "react-native";
import { HomeStackNavProps, HomeParamList } from "./params/HomeParamList";
import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Tasks from "./screens/TasksScreen";
import TaskScreen from "./screens/TaskScreen";
import PrayIcon from 'react-native-vector-icons/FontAwesome5'; 
import SubscribedScreen from "./screens/SubscribedScreen";
import ColumnSettingsScreen from "./screens/ColumnSettingsScreen";


const Tab = createMaterialTopTabNavigator();

function List({ route, navigation }: HomeStackNavProps<"Lists">) {
  
  return (
    <Tab.Navigator 
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: '#72A8BC',
        inactiveTintColor: '#C8C8C8',
        indicatorStyle :{
          backgroundColor:'#72A8BC'
        },
        style: {
          backgroundColor: '#FFF'
        },
        labelStyle: {
          fontSize: 13,
        },
      }}>
      <Tab.Screen 
        name="Task" 
        component={Tasks} 
        initialParams={{ itemId: route.params?.name.id }}
      />
      <Tab.Screen name="SubscribedScreen" component={SubscribedScreen} />
    </Tab.Navigator>
  );
} 


export const addTasksRoutes = (Stack: any) => {
  return (
    <>
      <Stack.Screen 
        name='TaskScreen' 
        component={TaskScreen} 
        options={{
          headerTitle: '',
          headerRight: () => <PrayIcon style={styles.taskHeaderIcon} name={'praying-hands'} size={22} color="#FFF" />,
          headerStyle: styles.taskHeader,
          headerTitleStyle: styles.taskHeaderText,
          headerTitleAlign: 'left',
          headerTintColor: '#FFF'
        }} 
      />
      <Stack.Screen
        options={({ navigation, route }: any) => ({
          headerTitle: route.params.name.title,
          headerTitleAlign: 'center',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerRight: () => {
            return (
              <Icon 
              style={styles.settingsIcon} 
              name={'settings'} size={24} 
              color="#72A8BC" 
              onPress={() => 
                navigation.navigate('ColumnSettingsScreen', {
                  title: route.params.name.title,
                  id: route.params.name.id
              })}/>
            )
          }
        })}
        name="List"
        component={List}
      />
      <Stack.Screen 
      name="ColumnSettingsScreen" 
      component={ColumnSettingsScreen}
      options={({ navigation, route }: any) => ({
          headerTitle: 'Settings',
          headerTitleAlign: 'center'
      })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    //borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  headerText: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 20.29,
    fontFamily: 'SFUIText',
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
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  taskHeaderText: {
    color: '#FFF',
    alignSelf: 'flex-end'
  },
  taskHeaderIcon: {
    marginRight: 15
  }
});
