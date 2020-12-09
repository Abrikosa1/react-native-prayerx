import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { MainStackParamList } from '../navigators/MainStack';
import { selectLists } from '../store/selectors';

type ListsScreenRouteProp = RouteProp<MainStackParamList, 'ListsScreen'>;

type ListsScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ListsScreen'
>;
interface IProps {
  navigation: ListsScreenNavigationProp;
  route: ListsScreenRouteProp;
}

const ListsScreen: React.FC<IProps> = React.memo(({ navigation, route }) => {
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
                id: item.id, title: item.title })}
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
});

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