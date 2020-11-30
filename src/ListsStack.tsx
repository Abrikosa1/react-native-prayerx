import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, FlatList, Button, StyleSheet, View } from "react-native";
import { HomeParamList, HomeStackNavProps } from "./params/HomeParamList";
import { shallowEqual, useSelector } from "react-redux";
import AddListIcon from "./components/AddListIcon";
import { addTasksRoutes } from "./addTasksRoutes";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Lists({ navigation }: HomeStackNavProps<"Lists">) {
  const selectLists = (state: any) => state;
  const state = useSelector(selectLists, shallowEqual);
  return (
      <FlatList
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <View style={styles.list} >
              <TouchableOpacity onPress={() => navigation.navigate("List", {
                  name: item
                })}>
                <Text style={styles.text}>{item.title}</Text>
              </TouchableOpacity>
            </View> 
          );
        }}
        keyExtractor={(list, id) => list + id}
        data={state.data.lists}
      />
  );
}

export const ListsStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Lists">
      {addTasksRoutes(Stack)}
      <Stack.Screen
        name="Lists"
        options={{
          headerTitle: 'My Desk',
          headerRight: () => <AddListIcon />,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTitleAlign: 'center',
        }} 
        component={Lists}
      />
      {/* <Stack.Screen name='TaskScreen' component={TaskScreen}/> */}
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

  }
});
