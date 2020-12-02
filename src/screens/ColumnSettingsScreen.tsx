import React, { useRef, useState } from 'react';
import { RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';
import { initStyles } from '../styles';
import { State } from '../types';

interface IProps {
  navigation: any;
  route: any;
}

const ColumnSettingsScreen: React.FC<IProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const selectCurrentUser = (state: State) => state.user;
  const user = useSelector(selectCurrentUser, shallowEqual);
  const [newListTitle, setNewListTitle] = useState('');
  const { params } = route;
  const inputRef: any = useRef(null);
  const handlePressRenameList = () => {
    if(newListTitle) {
      dispatch({
        type:dataSagaActions.RENAME_LIST, 
        payload: {
          token: user.token, 
          id: params.id,
          newList: { 
            title: newListTitle, 
            description: ''
          }
        }
      });
      navigation.pop();
    }
  }
  const handlePressRemoveList = () => {
    dispatch({type: dataSagaActions.REMOVE_LIST, payload: {token: user.token, id: params.id}});
    navigation.navigate('Lists');
  }
  return(
    <View style={styles.settingsContainer}>
        <TextInput
          ref={inputRef}
          style={initStyles.input}
          placeholder={params.title}
          underlineColorAndroid="transparent"
          onChangeText={title => setNewListTitle(title)}
        />
        <TouchableOpacity
          style={initStyles.button}
          onPress={handlePressRenameList}
        >
          <Text style={initStyles.text}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[initStyles.button, styles.removeButton]}
          onPress={handlePressRemoveList}
        >
          <Text style={initStyles.text}>Remove Column</Text>
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
    backgroundColor: '#AC5253'
  }
})
export default ColumnSettingsScreen;
