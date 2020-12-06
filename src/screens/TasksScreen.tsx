import React, { useRef, useState } from 'react';
import { Alert, Animated, FlatList, Image, ListView, ListViewBase, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { View, Text, TextInput } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { List, State, Task, Comment, Data, User } from '../types';
import Icon from 'react-native-vector-icons/AntDesign';
import TaskCard from '../components/TaskCard';
import { useRoute } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';


const TasksScreen = ({ navigation, route }: any) => {
  //later move to selectors
  const selectCurrentUser = (state: State) => state.user;
  const user: User = useSelector(selectCurrentUser, shallowEqual);


  const selectTasksByListId = (listId: number) => 
  (state: State) => state.data.tasks.filter((task: Task) => task.columnId === listId);
  const tasks = useSelector(selectTasksByListId(route.params.itemId), shallowEqual);
  const unCheckedTasks =  tasks.filter(task => !task.checked);
  const checkedTasks = tasks.filter(task => task.checked);
  //console.log(checkedTasks);
  const dispatch = useDispatch();

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey:any, taskId: string) => {
      closeRow(rowMap, rowKey);
      console.log(taskId)
      dispatch({type: dataSagaActions.REMOVE_TASK, payload: {token: user.token, id: taskId}});
  };

  const onRowDidOpen = (rowKey:any) => {
  };

  const onSwipeValueChange = (swipeData: any) => {
  };

  //show checked 
  const [showChecked, setShowChecked] = useState(false);
  //add task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const handleChange = (newTaskTitle: string) => {
    setNewTaskTitle(newTaskTitle)
  }
  const inputRef: any = useRef(null);
  const handleSubmit = () => {
    if(newTaskTitle) {
      //dispatch(addTask({listId: route.params.itemId, title: newTaskTitle, username: currentUser.name}));
      dispatch({
        type: dataSagaActions.ADD_TASK, payload: { 
          token: user.token,
          newTask: { 
            title: newTaskTitle,
            description: '', 
            checked: false, 
            column: route.params.itemId
          }
        }
      });
      setNewTaskTitle('');
    }
    else {
      inputRef.current.focus();
    }
  }
  
  return (
    <>
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
        extraData={unCheckedTasks}
        data={unCheckedTasks}
        keyExtractor={item => item.id.toString()}
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
          </View>)}
        rightOpenValue={-80}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        onSwipeValueChange={onSwipeValueChange}
        ListFooterComponent={
          <>
            {unCheckedTasks.length === 0 && <Text style={styles.messageText}>No unanswered prayers, press button to see answered...</Text>}
            {(checkedTasks.length > 0) && 
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowChecked(!showChecked)}
            >
              <Text style={styles.text}>{showChecked ? 'Hide Answered Prayers' : 'Show Answered Prayers'}</Text>
            </TouchableOpacity>} 
            {showChecked && <SwipeListView
              disableRightSwipe={true}
              useFlatList={true}
              extraData={checkedTasks}
              data={checkedTasks}
              keyExtractor={item => item.id.toString()}
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
                </View>)}
              rightOpenValue={-80}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
              onSwipeValueChange={onSwipeValueChange}
            />}
          </>
        }
      />}
    </>
  )
};


const styles = StyleSheet.create({
  input: { 
    flex: 1,
    fontSize: 14,
    paddingRight: 15,
    fontFamily: 'SFUIText-Regular',
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
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    minWidth: 209,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'SFUIText-Regular',
  },
  text: {
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontFamily: 'SFUIText-Regular',
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
    alignItems: 'center',
    fontFamily: 'SFUIText-Regular',
  },
  backRightBtnRightText: {
    color: '#FFF',
    textTransform: 'none',
    fontSize: 13,
    lineHeight: 15,
    fontFamily: 'SFUIText-Regular',
  },
  messageText:{
    alignSelf: 'center',
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    color: '#514D47',
    textTransform: 'none',
    fontSize: 15,
    lineHeight: 15,
    fontFamily: 'SFUIText-Regular',
  }
});

export default TasksScreen;