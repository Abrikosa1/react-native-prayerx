import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';
import { initStyles } from '../styles';
import { State } from '../types';

interface IProps {

}

const AddListModal: React.FC<IProps> = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const selectCurrentUser = (state: State) => state.user;
  const user = useSelector(selectCurrentUser, shallowEqual);
  const [newListTitle, setNewListTitle] = useState('');

  const inputRef: any = useRef(null);
  
  const handlePress = () => {
    if(newListTitle) {
      dispatch({
        type:dataSagaActions.ADD_LIST, 
        payload: {
          token: user.token, 
          newList: { 
            title: newListTitle, 
            description: ''
          }
        }
      });
      navigation.pop();
    }
    else {
      inputRef.current.focus();
    }
  }
  return(
    <View style={styles.modalContainer}>
      <TextInput
          ref={inputRef}
          style={initStyles.input}
          placeholder="Add a list..."
          underlineColorAndroid="transparent"
          onChangeText={title => setNewListTitle(title)}
        />
        <TouchableOpacity
          style={initStyles.button}
          onPress={handlePress}
        >
          <Text style={initStyles.text}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  }
});
export default AddListModal;