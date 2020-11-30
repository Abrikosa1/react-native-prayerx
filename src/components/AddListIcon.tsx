import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { addList } from '../store/DataSlice';

const AddListIcon = () => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(addList('Hello'));
  }
  return (
    <Icon style={styles.headerAddIcon} name={'plus'} size={16} color="#72A8BC" onPress={handlePress}/>
  )
};

const styles = StyleSheet.create({
  headerAddIcon: {
    position: 'absolute',
    right: 15,
  },
});

export default AddListIcon;