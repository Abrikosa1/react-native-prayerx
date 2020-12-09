import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListTabParamList } from '../navigators/ListTabNavigator';
import { MainStackParamList } from '../navigators/MainStack';

type SubscribedScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<ListTabParamList, 'TasksScreen'>,
  StackNavigationProp<MainStackParamList>
>;
type SubscribedScreenRouteProp = RouteProp<ListTabParamList, 'TasksScreen'>;

interface IProps {
  route: SubscribedScreenRouteProp;
  navigation: SubscribedScreenNavigationProp;
}


const SubscribedScreen: React.FC<IProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Subscribed Screen</Text>
       {/* <FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.tasks} 
        data={subscribedTasks} 
        renderItem={({ item, index, separators }) => (<TaskCard key={item.id} task={item}/>)}
      />   */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Show checked')}
      >
        <Text style={styles.text}> Show Answered Prayers</Text>
      </TouchableOpacity> */}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasks: {
    marginRight: 15,
    marginLeft: 15
  },
  button: {
    height: 30,
    backgroundColor: '#BFB393',
    borderRadius: 15,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'SFUIText-Regular',
  },
  text: {
    textTransform: 'uppercase',
    color: '#000',
    fontFamily: 'SFUIText-Regular',
  },
});
export default SubscribedScreen;