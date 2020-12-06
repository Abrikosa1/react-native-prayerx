import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import SubscribedScreen from '../screens/SubscribedScreen';
import TasksScreen from '../screens/TasksScreen';

const Tab = createMaterialTopTabNavigator();

const ListTabNavigator: React.FC = ({ route, navigation }: any) => {
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
          backgroundColor: '#FFF',
        },
        labelStyle: {
          fontSize: 13,
          fontFamily: 'SFUIText-Regular',
        },

      }}>
      <Tab.Screen 
        name="TasksScreen" 
        component={TasksScreen} 
        options={{
          title: 'My prayers'
        }}
        initialParams={{ itemId: route.params.list.id }}
      />
      <Tab.Screen 
        name="SubscribedScreen" 
        component={SubscribedScreen} 
        options={{
          title: 'Subscribed',
        }}
      />
    </Tab.Navigator>
  );
} 

export default ListTabNavigator;