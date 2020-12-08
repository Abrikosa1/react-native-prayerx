import React, { useRef, useState } from 'react';
import { RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';
import { initStyles } from '../styles';
import { State, Task } from '../types';

interface IProps {
  navigation: any;
  route: any;
}

const TaskSettingsScreen: React.FC<IProps> = ({ navigation, route }) => {
  const { taskId } = route.params;
  
  const selectTaskById = (taskId: number) => 
    (state: State) => state.data.tasks.filter((task: Task) => task.id === taskId);
  const tasks = useSelector(selectTaskById(taskId), shallowEqual);
  const task = tasks[0];
  
  const dispatch = useDispatch();
  const selectCurrentUser = (state: State) => state.user;
  const user = useSelector(selectCurrentUser, shallowEqual);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [newTaskDescription, setNewTaskDescription] = useState(task.description);
  const [maxLength, setMaxLength] = useState(70);
  const inputRef: any = useRef(null);

  const handleChangeDescription = (inputText: string) => {
    setMaxLength(70 - inputText.length);
    setNewTaskDescription(inputText);
  };
  
  const handlePressRenameList = () => {
    if(newTaskTitle) {
      dispatch({
        type:dataSagaActions.UPDADE_TASK, 
        payload: {
          token: user.token, 
          taskId: taskId,
          newTask: { 
            title: newTaskTitle, 
            description: newTaskDescription,
            checked: task.checked,
            column: task.columnId
          }
        }
      });
      navigation.pop();
    }
  }
  const handlePressRemoveTask = () => {
    dispatch({type: dataSagaActions.REMOVE_TASK, payload: {token: user.token, id: taskId}});
    navigation.navigate('TasksScreen', {itemId: task.columnId});
  }
  return(
    <View style={styles.settingsContainer}>
      <TextInput
        ref={inputRef}
        style={styles.titleInput}
        placeholder='Type a title...'
        underlineColorAndroid="transparent"
        onChangeText={title => setNewTaskTitle(title)}
        defaultValue={newTaskTitle}
      />
      <View style={styles.titleInputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.descriptionInput}
          placeholder='Type a description...'
          underlineColorAndroid="transparent"
          onChangeText={title => handleChangeDescription(title)}
          defaultValue={newTaskDescription}
          maxLength={70}
        />
        <Text style={styles.maxLength}>{maxLength}</Text>
      </View>

      <TouchableOpacity
        style={initStyles.button}
        onPress={handlePressRenameList}
      >
        <Text style={initStyles.text}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[initStyles.button, styles.removeButton]}
        onPress={handlePressRemoveTask}
      >
        <Text style={initStyles.text}>Remove Task</Text>
      </TouchableOpacity>
    </View>
  )
};  

const styles = StyleSheet.create({
  settingsContainer: {
    padding: 15,
    flex: 1,
  },
  removeButton: {
    marginTop: 'auto',
    backgroundColor: '#AC5253',
    fontFamily: 'SFUIText-Regular',
  },
  titleInput: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 2,
    marginBottom: 15,
  },
  descriptionInput: {
    flex: 1
  },
  titleInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 2,
    marginBottom: 15,
    alignItems: 'center',
    color: '#AC5253',
  },
  maxLength: {
    color: '#BFB393',
    fontSize: 15,
  }
})
export default TaskSettingsScreen;
