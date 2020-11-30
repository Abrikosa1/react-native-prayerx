import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CommentComponent from '../components/CommentComponent';
import { HomeParamList } from '../params/HomeParamList';
import { Comment, State, Task } from '../types';
import Icon from 'react-native-vector-icons/Feather';
import { addComment } from '../store/DataSlice';

interface IProps {
  navigation: any
  route: any
}

const TaskScreen: React.FC<IProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');

  //later move to selector
  const selectCommentsByTaskId = (taskId: string) => 
    (state: any) => state.data.comments.filter((comment: Comment) => comment.taskId === taskId);
  const comments:Array<Comment> = useSelector(selectCommentsByTaskId(route.params.task.id), shallowEqual);

  //later move to selector
  const selectCurrentUsername = (state: State) => state.user.currentUser;
  const currentUser = useSelector(selectCurrentUsername, shallowEqual);

  const handleChange = (newCommentText: string) => {
    setNewComment(newCommentText)
  }
  const inputRef: any = useRef(null);
  const handleSubmit = () => {
    if(newComment) {
      dispatch(addComment({taskId: route.params.task.id, text: newComment, author: currentUser.username}));
      setNewComment('');
    }
    else {
      inputRef.current.focus();
    }
  }
  
  return (
    <View style={styles.taskContainer}>
      {/* <View style={[styles.comments, styles.rightLeftPadding]}> */}
        <FlatList
          ListHeaderComponent={
            <>
              <View style={[styles.taskHeader, styles.rightLeftPadding]}>
                <Text style={styles.taskHeaderText}>{route.params.task.title} which is for my family to love God whole heartedly.</Text>
              </View>
              <View style={[styles.lastPrayed, styles.rightLeftPadding]}>
                <View style={styles.verticalLine}></View>
                <Text>Last prayed & min ago</Text>
              </View>
              <View style={styles.taskInfo}>
                <View style={[styles.taskInfoItem, styles.borderBottom, styles.borderRight, styles.borderTop, styles.rightLeftPadding]}>
                  <Text>Time</Text>
                </View>
                <View style={[styles.taskInfoItem, styles.borderBottom, styles.borderTop, styles.rightLeftPadding]}>
                  <Text>123</Text>
                </View>
                <View style={[styles.taskInfoItem, styles.borderBottom, styles.borderRight, styles.rightLeftPadding]}>
                  <Text>63</Text>
                </View>
                <View style={[styles.taskInfoItem, styles.borderBottom, styles.rightLeftPadding]}>
                  <Text>60</Text>
                </View>
              </View>
              <View style={[styles.members, styles.rightLeftPadding]}>
                <Text style={styles.headingText}>Members</Text>
                <View style={styles.memberIcons}>
                  <View style={styles.memberIcon}></View>
                  <View style={styles.memberIcon}></View>
                  <View style={styles.memberIcon}></View>
                  <View style={styles.memberIcon}></View>
                </View>
              </View>
              <View style={[styles.commentsHeading, styles.rightLeftPadding]}>
                <Text style={styles.headingText}>Comments</Text>
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(comment: Comment, id: any) => comment + id}
          data={comments} 
          renderItem={({ item, index, separators }) => (<CommentComponent key={item.id} comment={item}/>)}
          ListFooterComponent={
            <View style={styles.addCommentContainer}>
              <Icon style={styles.icon}
                name={'message-square'} size={20} color="#BFB393"
              />
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Add a comment..."
                underlineColorAndroid="transparent"
                onChangeText={handleChange}
                onSubmitEditing={handleSubmit}
                defaultValue={newComment}
                //onSubmitEditing={({ nativeEvent }) => setNewComment(nativeEvent.text)}
              />
            </View>
          }
        />  
      {/* </View> */}
    </View>
  )
};

const styles = StyleSheet.create({
  taskContainer: {
  },
  rightLeftPadding: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  taskHeader: {
    height: 65,
    backgroundColor: '#BFB393',
    justifyContent: 'flex-start',
  },
  taskHeaderText: {
    color: '#FFF',
    fontSize: 17,
    lineHeight: 26.89
  },
  lastPrayed: {
    flexDirection: 'row',
    height: 50,
    //borderBottomWidth: 1,
    //borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  verticalLine: {
    height: 24,
    width: 3,
    backgroundColor: '#AC5253',
    borderRadius: 10,
    marginRight: 15
  },
  taskInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }, 
  taskInfoItem: {
    flexBasis: '50%',
    width: '50%',
    height: 108,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#E5E5E5'
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: '#E5E5E5'
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: '#E5E5E5'
  },
  members: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  memberIcons: {
    flexDirection: 'row',
  },
  memberIcon: {
    marginTop: 15,
    borderRadius: 25,
    width: 32,
    height: 32,
    backgroundColor: 'gray',
    marginRight: 8
  },
  headingText: {
    textTransform: 'uppercase',
    fontSize: 13,
    lineHeight: 15.23,
    color: '#72A8BC',
  },
  membersText: {

  },
  commentsHeading: {
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5'
  },
  addCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 19
  },
  input: { 
    flex: 1,
    fontSize: 17,
    lineHeight: 19.92,
    paddingRight: 15,
    color: '#9C9C9C'
  },
  icon: {
    paddingLeft: 15,
    paddingRight: 12
  },
});

export default TaskScreen;