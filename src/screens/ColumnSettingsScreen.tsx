import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { MainStackParamList } from '../navigators/MainStack';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';
import { selectCurrentUser, selectListById } from '../store/selectors';
import { initStyles } from '../styles';


type ColumnSettingsScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ColumnSettingsScreen'
>;

type ColumnSettingsScreenRouteProp = RouteProp<MainStackParamList, 'ColumnSettingsScreen'>;

interface IProps {
  navigation: ColumnSettingsScreenNavigationProp;
  route: ColumnSettingsScreenRouteProp;
}

const ColumnSettingsScreen: React.FC<IProps> = React.memo(({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();

  const lists = useSelector(selectListById(id), shallowEqual);
  const list = lists[0];
  const user = useSelector(selectCurrentUser, shallowEqual);
  
  const [newListTitle, setNewListTitle] = useState<string>(list.title);

  const inputRef = useRef<TextInput>(null);

  const handlePressRenameList = () => {
    if(newListTitle) {
      dispatch({
        type:dataSagaActions.UPDATE_LIST.type, 
        payload: {
          token: user.token, 
          id: id,
          newList: { 
            title: newListTitle, 
            description: ''
          }
        }
      });
      navigation.navigate('ListTabNavigator', {title: newListTitle});
    }
  };

  const handlePressRemoveList = () => {
    dispatch({type: dataSagaActions.REMOVE_LIST.type, payload: {token: user.token, id: id}});
    navigation.navigate('ListsScreen');
  };

  return(
    <View style={styles.settingsContainer}>
      <TextInput
        ref={inputRef}
        style={initStyles.input}
        placeholder='Type a title...'
        underlineColorAndroid="transparent"
        onChangeText={title => setNewListTitle(title)}
        defaultValue={newListTitle}
      />
      <TouchableOpacity
        style={initStyles.button}
        onPress={handlePressRenameList}
      >
        <Text style={initStyles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[initStyles.button, styles.removeButton]}
        onPress={handlePressRemoveList}
      >
        <Text style={initStyles.buttonText}>Remove Column</Text>
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
  }
})
export default ColumnSettingsScreen;
