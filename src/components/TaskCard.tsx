import React, { useState} from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { SubscribedTask, Task } from '../types';
import Icon from 'react-native-vector-icons/Feather';
import PrayIcon from 'react-native-vector-icons/FontAwesome5';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


interface IProps {
  task: Task | SubscribedTask;
}

const TaskCard: React.FC<IProps> = ({ task }) => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.rect}></View>
      <CheckBox
        style={styles.checkBox}
        disabled={false}
        tintColors={{true: '#424E75', false: '#514D47' }}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
      <View style={styles.taskBody}  >
          <Text style={styles.taskText} onPress={() => navigation.navigate('TaskScreen', {task: task})}>
            {task.title}
          </Text>
      </View>


      <View style={styles.icons}>
        <View style={styles.userIcon}>
            <Icon name={'user'} size={22} color="#72A8BC" />
            <Text style={styles.iconText}>3</Text>
        </View>
         <View style={styles.prayIcon}>
            <PrayIcon name={'praying-hands'} size={22} color="#72A8BC" />
            <Text style={styles.iconText}>162</Text>
         </View>

      </View>
    </View>
  )
}

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
    //width: '100%'
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
    marginLeft: 5
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
    textAlignVertical: 'center'
  }
});


export default TaskCard;