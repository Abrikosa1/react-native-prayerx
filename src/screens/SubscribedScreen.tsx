import React from 'react';
import { View, Text, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SubscribedTask } from '../types';
import TaskCard from '../components/TaskCard';
import { v4 as uuidv4 } from 'uuid';

const task0Id = uuidv4(),
      task1Id = uuidv4(),
      task2Id = uuidv4(),
      task3Id = uuidv4();
const subscribedTasks: Array<SubscribedTask> = [
  { id: task0Id, title: 'Subscribed Task #1', complete: false }, 
  { id: task1Id, title: 'Subscribed Task #2', complete: true }, 
  { id: task2Id, title: 'Subscribed Task #3', complete: true },
  { id: task3Id, title: 'Subscribed Task #4', complete: true },
]

const SubscribedScreen = () => {
  return (
    <View>
       <FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.tasks} 
        data={subscribedTasks} 
        renderItem={({ item, index, separators }) => (<TaskCard key={item.id} task={item}/>)}
      />  
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Show checked')}
      >
        <Text style={styles.text}> Show Answered Prayers</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
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
  },
  text: {
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
});
export default SubscribedScreen;