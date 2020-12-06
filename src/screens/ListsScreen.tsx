import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '../types';

const ListsScreen: React.FC = ({ navigation, route }: any) => {
  const selectCurrentUser = (state: State) => state.user;
  const user = useSelector(selectCurrentUser, shallowEqual);

  const selectLists = (state: State) => state.data.lists;
  const lists = useSelector(selectLists, shallowEqual);
  return (
      <FlatList
        style={{ marginBottom: 15}}
        renderItem={({ item }) => {
          return (
            <View style={styles.list} >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ListTabNavigator", {
                  list: item })}
                }
              >
                <Text style={styles.text}>{item.title}</Text>
              </TouchableOpacity>
            </View> 
          );
        }}
        keyExtractor={list => list.id.toString()}
        data={lists}
        extraData={lists}
      />
  );
};

const styles = StyleSheet.create({
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
})

export default ListsScreen;