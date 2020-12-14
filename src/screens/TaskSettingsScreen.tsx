import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ListTabParamList } from '../navigators/ListTabNavigator';
import { MainStackParamList } from '../navigators/MainStack';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';
import { selectCurrentUser, selectTaskById } from '../store/selectors';
import { initStyles } from '../styles';

type TaskSettingsScreenNavigationProp = StackNavigationProp<
  ListTabParamList,
  'TaskSettingsScreen'
>;

type TaskSettingsScreenRouteProp = RouteProp<MainStackParamList, 'TaskSettingsScreen'>;

interface IProps {
  navigation: TaskSettingsScreenNavigationProp;
  route: TaskSettingsScreenRouteProp;
}

const TaskSettingsScreen: React.FC<IProps> = React.memo(({ navigation, route }) => {
  const { taskId } = route.params;
  const dispatch = useDispatch();
  const inputRef = useRef<TextInput>(null);

  const tasks = useSelector(selectTaskById(taskId), shallowEqual);
  const task = tasks[0];
  const user = useSelector(selectCurrentUser, shallowEqual);

  const [newTaskTitle, setNewTaskTitle] = useState<string>(task.title);
  const [newTaskDescription, setNewTaskDescription] = useState<string>(task.description);
  const [maxLength, setMaxLength] = useState<number>(70 - task.description.length);


  const handleChangeDescription = (inputText: string) => {
    setMaxLength(70 - inputText.length);
    setNewTaskDescription(inputText);
  };
  
  const handlePressRenameList = () => {
    if(newTaskTitle) {
      dispatch({
        type:dataSagaActions.UPDADE_TASK.type, 
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
  };

  const handlePressRemoveTask = () => {
    dispatch({type: dataSagaActions.REMOVE_TASK.type, payload: {token: user.token, id: taskId}});
    navigation.navigate('TasksScreen', {itemId: task.columnId});
  };

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
          multiline={true}
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
        <Text style={initStyles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[initStyles.button, styles.removeButton]}
        onPress={handlePressRemoveTask}
      >
        <Text style={initStyles.buttonText}>Remove Task</Text>
      </TouchableOpacity>
    </View>
  )
});  

const styles = StyleSheet.create({
  settingsContainer: {
    padding: 15,
    flex: 1,
  },
  removeButton: {
    marginTop: 'auto',
    backgroundColor: '#AC5253',
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
