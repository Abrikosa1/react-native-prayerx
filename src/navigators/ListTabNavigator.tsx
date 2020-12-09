import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import SubscribedScreen from '../screens/SubscribedScreen';
import TasksScreen from '../screens/TasksScreen';
import { MainStackParamList } from './MainStack';

export type ListTabParamList = {
  TasksScreen: { itemId: number };
  SubscribedScreen: undefined;
  TaskSettingsScreen: { itemId: number };
};

const Tab = createMaterialTopTabNavigator<ListTabParamList>();


type ListTabRouteProp = RouteProp<MainStackParamList, 'ListTabNavigator'>;

type ListTabNavigatorNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ListTabNavigator'
>;


interface IProps {
  route: ListTabRouteProp,
  navigation: ListTabNavigatorNavigationProp,
}

const ListTabNavigator: React.FC<IProps> = ({ route, navigation }) => {
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
        initialParams={{ itemId: route.params.id }}
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