import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';
import { selectCurrentUser } from '../store/selectors';
import { initStyles } from '../styles';

interface IProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddListModal: React.FC<IProps> = React.memo(({showModal, setShowModal}) => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser, shallowEqual);
  const [newListTitle, setNewListTitle] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  
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
      //navigation.pop();
      setShowModal(false);
    }
    else {
      inputRef.current?.focus();
    }
  }
  return(
      <Modal 
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        
      >
      <View style={styles.centeredView} >
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
            <Text style={initStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#C8C8C8",
  },
  modalContainer: {
    opacity: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  }
});
export default AddListModal;