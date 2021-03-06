import React, { useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Task } from '../types';
import Icon from 'react-native-vector-icons/Feather';
import PrayIcon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';
import { selectCommentsByTaskId, selectCurrentUser } from '../store/selectors';


interface IProps {
  task: Task;
}

const TaskCard: React.FC<IProps> = React.memo(({ task }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(task.checked);

  const user = useSelector(selectCurrentUser, shallowEqual);
  const comments = useSelector(selectCommentsByTaskId(task.id), shallowEqual);
  
  const handleValueChange = (newValue: boolean) => {
    setToggleCheckBox(newValue);
    dispatch({
      type: dataSagaActions.UPDADE_TASK.type, 
      payload: { 
        taskId: task.id,
        token: user.token,
        newTask: { 
          title: task.title,
          description: task.description,
          checked: newValue,
          column: task.columnId
        }
      }
    });
  } 
  
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.rect}></View>
      <CheckBox
        style={styles.checkBox}
        //disabled={false}
        tintColors={{true: '#424E75', false: '#514D47' }}
        value={toggleCheckBox}
        onValueChange={(newValue) => handleValueChange(newValue)}
      />
      <View style={styles.taskBody}  >
          <Text style={[styles.taskText, toggleCheckBox && {textDecorationLine: 'line-through'}]} onPress={() => navigation.navigate('TaskScreen', { taskId: task.id })}>
            {task.title}
          </Text>
      </View>


      <View style={styles.icons}>
        <View style={styles.userIcon}>
            <Icon name={'user'} size={22} color="#72A8BC" />
            <Text style={styles.iconText}>{comments.length}</Text>
        </View>
         <View style={styles.prayIcon}>
            <PrayIcon name={'praying-hands'} size={22} color="#72A8BC" />
            <Text style={styles.iconText}>162</Text>
         </View>

      </View>
    </View>
  )
});

const styles = StyleSheet.create({
  taskWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    height: 68,
    paddingRight: 15,
    paddingLeft: 15,
    //marginRight: 15,
    //marginLeft: 15,
  },
  checkBox: {
    marginRight: 15,
    marginLeft: 15,
    height: 22,
    width: 22,
  },
  rect: {
    height: 24,
    width: 3,
    backgroundColor: '#AC5253',
    borderRadius: 10
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  userIcon: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 15
  },
  prayIcon: {
    display: 'flex',
    flexDirection: 'row'
  },
  iconText: {
    marginLeft: 5,
    fontFamily: 'SFUIText-Regular',
  },
  taskBody: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  taskText: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    fontFamily: 'SFUIText-Regular',
  }
});


export default TaskCard;