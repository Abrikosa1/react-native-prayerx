import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CommentComponent from '../components/CommentComponent';
import { HomeParamList } from '../params/HomeParamList';
import { Comment, State, Task } from '../types';
import Icon from 'react-native-vector-icons/Feather';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';
import { SwipeListView } from 'react-native-swipe-list-view';

interface IProps {
  navigation: any
  route: any
}

const TaskScreen: React.FC<IProps> = ({ navigation, route }) => {
  const { taskId } = route.params;
  const selectCommentsByTaskId = (taskId: number) => 
    (state: State) => state.data.comments.filter((comment: Comment) => comment.cardId === taskId);
  const comments:Array<Comment> = useSelector(selectCommentsByTaskId(taskId), shallowEqual);
  // const sortedByDate:Array<Comment> = comments.sort((a: Comment,b: Comment) => {
  //   return Math.abs(new Date(a.created).getTime() - new Date(b.created).getTime());
  // });
  // console.log('unsorted ', comments);
  // console.log('sorted', sortedByDate);
  const selectTaskById = (taskId: number) => 
    (state: State) => state.data.tasks.filter((task: Task) => task.id === taskId);
  const tasks = useSelector(selectTaskById(taskId), shallowEqual);
  const task = tasks[0];

  const dispatch = useDispatch();
  const [newCommentBody, setNewCommentBody] = useState('');

  //later move to selector
  const selectCurrentUsername = (state: State) => state.user;
  const user = useSelector(selectCurrentUsername, shallowEqual);

  //dispatch({type: dataSagaActions.LOAD_COMMENTS, payload: { token: user.token}})
  

  const handleChange = (newCommentText: string) => {
    setNewCommentBody(newCommentText)
  }
  const inputRef: any = useRef(null);
  const handleSubmit = () => {
    if(newCommentBody) {
      //dispatch(addComment({taskId: route.params.task.id, text: newComment, author: currentUser.name}));
      dispatch({
        type:dataSagaActions.ADD_COMMENT,
        payload: {
          token: user.token, 
          cardId: task.id, 
          newComment: { 
            body: newCommentBody, 
            created: new Date().toString()
          }
        }
      });
      setNewCommentBody('');
    }
    else {
      inputRef.current.focus();
    }
  }
  const editComment = (rowMap: any, rowKey:any, taskId: number) => {
    console.log(taskId);
  }
  
  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey:any, taskId: number) => {
      closeRow(rowMap, rowKey);
      dispatch({type: dataSagaActions.REMOVE_COMMENT, payload: {token: user.token, id: taskId}});
  };

  const onRowDidOpen = (rowKey:any) => {
  };

  const onSwipeValueChange = (swipeData: any) => {
  };
  return (
    <View style={styles.taskContainer}>
      {/* <View style={[styles.comments, styles.rightLeftPadding]}> */}
        <SwipeListView
          ListHeaderComponent={
            <>
              <View style={[styles.taskHeader, styles.rightLeftPadding]}>
                <Text style={styles.taskHeaderText}>{task.title} which is for my family to love God whole heartedly.</Text>
              </View>
              <View style={[styles.lastPrayed, styles.rightLeftPadding]}>
                <View style={styles.verticalLine}></View>
                <Text style={styles.lastPrayedText}>Last prayed & min ago</Text>
              </View>
              <View style={styles.taskInfo}>
                <View style={[styles.taskInfoItem, styles.borderBottom, styles.borderRight, styles.borderTop, styles.rightLeftPadding]}>
                  <Text style={styles.taskInfoHeading}>July 25 2017</Text>
                  <Text style={styles.taskInfoDescription}>Date Added</Text>
                  <Text style={[styles.taskInfoDescription, styles.taskInfoOpenedFor]}>Opened for 4 days</Text>
                </View>
                <View style={[styles.taskInfoItem, styles.borderBottom, styles.borderTop, styles.rightLeftPadding]}>
                  <Text style={styles.taskInfoHeading}>123</Text>
                  <Text style={styles.taskInfoDescription}>Times Prayed Total</Text>
                </View>
                <View style={[styles.taskInfoItem, styles.borderBottom, styles.borderRight, styles.rightLeftPadding]}>
                  <Text style={styles.taskInfoHeading}>63</Text>
                  <Text style={styles.taskInfoDescription}>Times Prayed by Me</Text>
                </View>
                <View style={[styles.taskInfoItem, styles.borderBottom, styles.rightLeftPadding]}>
                  <Text style={styles.taskInfoHeading}>60</Text>
                  <Text style={styles.taskInfoDescription}>Times Prayed by Others</Text>
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
          disableRightSwipe={true}
          useFlatList={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={comment => comment.id.toString()}
          data={comments} 
          extraData={comments}
          renderItem={({ item, index, separators }) => (<CommentComponent key={item.id} comment={item} user={user}/>)}
          renderHiddenItem={(data:any, rowMap: any) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.backRightBtnRight, styles.editBtn]}
                onPress={() => editComment(rowMap, data.item.key, data.item.id)}
              >
                <Text style={styles.backRightBtnRightText}>Edit</Text>
              </TouchableOpacity>
                            <TouchableOpacity
                style={styles.backRightBtnRight}
                onPress={() => deleteRow(rowMap, data.item.key, data.item.id)}
              >
                <Text style={styles.backRightBtnRightText}>Delete</Text>
              </TouchableOpacity>
            </View>)}
          rightOpenValue={-160}
          previewRowKey={'0'}
          //previewOpenValue={-160}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
          onSwipeValueChange={onSwipeValueChange}
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
                defaultValue={newCommentBody}
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
    flex: 1
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
    lineHeight: 26.89,
    fontFamily: 'SFUIText-Regular',
  },
  lastPrayed: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  lastPrayedText: {
    fontFamily: 'SFUIText-Regular',
  },
  taskInfoHeading: {
    fontSize: 22,
    lineHeight: 25.78,
    color: '#BFB393',
    marginBottom: 6,
    fontFamily: 'SFUIText-Regular',
  },
  taskInfoDescription: {
    color: '#514D47',
    fontSize: 13,
    lineHeight: 15.23,
    fontFamily: 'SFUIText-Regular',
  },
  taskInfoOpenedFor: {
    color: '#72A8BC',
    fontFamily: 'SFUIText-Regular',
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
    justifyContent: 'center'
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
    fontFamily: 'SFUIText-Regular',
  },
  membersText: {

  },
  commentsHeading: {
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    fontFamily: 'SFUIText-Regular',
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
    color: '#9C9C9C',
    fontFamily: 'SFUIText-Regular',
  },
  icon: {
    paddingLeft: 15,
    paddingRight: 12
  },
  rowBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%'
    
  },
  backRightBtnRight: {
    backgroundColor: '#AC5253',
    height: '100%',
    width: 80,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'SFUIText-Regular',
  },
  editBtn: {
    backgroundColor: '#72A8BC',
    fontFamily: 'SFUIText-Regular',
  },
  backRightBtnRightText: {
    color: '#FFF',
    textTransform: 'none',
    fontSize: 13,
    lineHeight: 15,
    fontFamily: 'SFUIText-Regular',
  }
});

export default TaskScreen;