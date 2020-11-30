import React, { useRef, useState } from 'react';
import { Alert, Animated, FlatList, Image, ListView, ListViewBase, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { View, Text, TextInput } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { List, State, Task, Comment, Data, User } from '../types';
import Icon from 'react-native-vector-icons/AntDesign';
import TaskCard from '../components/TaskCard';
import { useRoute } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { addTask, removeTask } from '../store/DataSlice';


const Tasks = ({ navigation, route }: any) => {
  //later move to selectors
  const selectTasksByListId = (listId: string) => 
  (state: any) => state.data.tasks.filter((task: Task) => task.listId === listId);
  const tasks:Array<Task> = useSelector(selectTasksByListId(route.params.itemId), shallowEqual);

  const dispatch = useDispatch();

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey:any, taskId: string) => {
      closeRow(rowMap, rowKey);
      console.log(taskId)
      dispatch(removeTask(taskId));
  };

  const onRowDidOpen = (rowKey:any) => {
  };

  const onSwipeValueChange = (swipeData: any) => {
  };

  //add task
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const selectCurrentUser = (state: State) => state.user.currentUser;
  const currentUser: User = useSelector(selectCurrentUser, shallowEqual);
  
  const handleChange = (newTaskTitle: string) => {
    setNewTaskTitle(newTaskTitle)
  }
  const inputRef: any = useRef(null);
  const handleSubmit = () => {
    if(newTaskTitle) {
      dispatch(addTask({listId: route.params.itemId, title: newTaskTitle, username: currentUser.username}));
      setNewTaskTitle('');
    }
    else {
      inputRef.current.focus();
    }
  }
  
  return (
    <View>
      <View style={styles.sectionStyle}>
        <Icon style={styles.icon}
            name={'plus'} size={22} color="#72A8BC"
        />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Add a prayer..."
          underlineColorAndroid="transparent"
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          defaultValue={newTaskTitle}
        />
      </View>
      {(tasks.length > 0) && <SwipeListView
        disableRightSwipe={true}
        useFlatList={true}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={ ({ item, index, separators }) => 
            <TaskCard key={item.id} task={item}/>
        }
        renderHiddenItem={(data:any, rowMap: any) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.backRightBtnRight}
              onPress={() => deleteRow(rowMap, data.item.key, data.item.id)}
            >
              <Text style={styles.backRightBtnRightText}>Delete</Text>
            </TouchableOpacity>
          </View>)
          }
        rightOpenValue={-80}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        onSwipeValueChange={onSwipeValueChange}
      />}
      {(tasks.length > 0) && <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Show checked')}
      >
        <Text style={styles.text}> Show Answered Prayers</Text>
      </TouchableOpacity>} 
    </View>
  )
};


const styles = StyleSheet.create({
  input: { 
    flex: 1,
    fontSize: 14,
    paddingRight: 15
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50, 
    borderColor: '#E5E5E5', 
    borderRadius: 10,
    margin: 15,
    borderWidth: 1 , 
  },
  icon: {
    paddingLeft: 15,
    paddingRight: 15
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
  },
  text: {
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  rowBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backRightBtnRight: {
    backgroundColor: '#AC5253',
    height: '100%',
    width: 80,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backRightBtnRightText: {
    color: '#FFF',
    textTransform: 'none',
    fontSize: 13,
    lineHeight: 15
  }
});

export default Tasks;