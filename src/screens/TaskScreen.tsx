import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CommentComponent from '../components/CommentComponent';
import { Comment } from '../types';
import Icon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { dataSagaActions } from '../store/DataSagas/dataSagaActions';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';
import { selectCommentsByTaskId, selectCurrentUser, selectTaskById } from '../store/selectors';
import { MainStackParamList } from '../navigators/MainStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { initStyles } from '../styles';


type TaskScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'TaskScreen'
>;

type TaskScreenRouteProp = RouteProp<MainStackParamList, 'TaskScreen'>;

interface IProps {
  navigation: TaskScreenNavigationProp;
  route: TaskScreenRouteProp;
}

const TaskScreen: React.FC<IProps> = React.memo(({ navigation, route }) => {
  const { taskId } = route.params;
  const dispatch = useDispatch();
  const inputRef = useRef<TextInput>(null);

  const comments:Array<Comment> = useSelector(selectCommentsByTaskId(taskId), shallowEqual);
  const user = useSelector(selectCurrentUser, shallowEqual);
  const tasks = useSelector(selectTaskById(taskId), shallowEqual);
  const task = tasks[0];

  
  const [newCommentBody, setNewCommentBody] = useState<string>('');
  const [editComment, setEditComment] = useState<boolean>(false);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

 
  const handleChange = (newCommentText: string) => {
    setNewCommentBody(newCommentText)
  }
 
  const handleSubmit = () => {
    if(newCommentBody) {
      if(!editComment) {
        dispatch({
          type:dataSagaActions.ADD_COMMENT.type,
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
      } else {
        dispatch({
          type:dataSagaActions.UPDATE_COMMENT.type,
          payload: {
            token: user.token, 
            commentId: editCommentId, 
            newComment: { 
              body: newCommentBody, 
              created: new Date().toString()
            }
          }
        });
        setNewCommentBody('');
        setEditComment(false);
      }
    }
    else {
      inputRef.current?.focus();
    }
  }
  
  const handleEditComment = (rowMap: RowMap<Comment>, rowKey: number, comment: Comment) => {
    setEditComment(true);
    setNewCommentBody(comment.body);
    setEditCommentId(comment.id);
    closeRow(rowMap, rowKey);
    inputRef.current?.focus();
  }
  
  const closeRow = (rowMap: RowMap<Comment>, rowKey: number) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: RowMap<Comment>, rowKey: number, commentId: number) => {
      closeRow(rowMap, rowKey);
      dispatch({type: dataSagaActions.REMOVE_COMMENT.type, payload: {token: user.token, id: commentId}});
  };

  const onRowDidOpen = (rowKey: string) => {
  };

  const onSwipeValueChange = (swipeData: any) => {
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch({ type: dataSagaActions.LOAD_DATA.type, payload: { token: user.token }});
    setRefreshing(false);
    //wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView 
      style={styles.taskContainer}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          progressBackgroundColor='#FFF'
          colors={['#BFB393']}
        />
      }
    >
      
      <SwipeListView
        ListHeaderComponent={
          <>
            <TouchableOpacity 
              style={[styles.taskHeader, initStyles.rightLeftPadding]}  
              onPress={() => navigation.navigate('TaskSettingsScreen', {taskId: task.id})}>
              <Text style={styles.taskHeaderText}>{task.title}</Text>
              <Text style={styles.taskHeaderText}>{task.description}</Text>
              <Text style={styles.taskHeaderSmallText}>Tap to change title or description...</Text>
            </TouchableOpacity>
            <View style={[styles.lastPrayed, initStyles.rightLeftPadding]}>
              <View style={styles.verticalLine}></View>
              <Text style={styles.lastPrayedText}>Last prayed & min ago</Text>
            </View>
            <View style={styles.taskInfo}>
              <View style={[styles.taskInfoItem, styles.borderBottom, styles.borderRight, styles.borderTop, initStyles.rightLeftPadding]}>
                <Text style={styles.taskInfoHeading}>July 25 2017</Text>
                <Text style={styles.taskInfoDescription}>Date Added</Text>
                <Text style={[styles.taskInfoDescription, styles.taskInfoOpenedFor]}>Opened for 4 days</Text>
              </View>
              <View style={[styles.taskInfoItem, styles.borderBottom, styles.borderTop, initStyles.rightLeftPadding]}>
                <Text style={styles.taskInfoHeading}>123</Text>
                <Text style={styles.taskInfoDescription}>Times Prayed Total</Text>
              </View>
              <View style={[styles.taskInfoItem, styles.borderBottom, styles.borderRight, initStyles.rightLeftPadding]}>
                <Text style={styles.taskInfoHeading}>63</Text>
                <Text style={styles.taskInfoDescription}>Times Prayed by Me</Text>
              </View>
              <View style={[styles.taskInfoItem, styles.borderBottom, initStyles.rightLeftPadding]}>
                <Text style={styles.taskInfoHeading}>60</Text>
                <Text style={styles.taskInfoDescription}>Times Prayed by Others</Text>
              </View>
            </View>
            <View style={[styles.members, initStyles.rightLeftPadding]}>
              <Text style={styles.headingText}>Members</Text>
              <View style={styles.memberIcons}>
                <View style={styles.memberIcon}></View>
                <View style={styles.memberIcon}></View>
                <View style={styles.memberIcon}></View>
                <View style={styles.memberIcon}></View>
              </View>
            </View>
            <View style={[styles.commentsHeading, initStyles.rightLeftPadding]}>
              <Text style={styles.headingText}>Comments</Text>
            </View>
          </>
        }
        disableRightSwipe={true}
        useFlatList={true}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        keyExtractor={comment => comment.id.toString()}
        data={comments} 
        extraData={comments}
        renderItem={({ item, index, separators }) => (
          <CommentComponent 
            key={item.id} 
            comment={item} 
            user={user}
          />
        )}
        renderHiddenItem={(data, rowMap: RowMap<Comment>) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.swipeBtn, styles.editBtn]}
              onPress={() => handleEditComment(rowMap, data.item.id, data.item)}
            >
              <Text style={styles.backRightBtnRightText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.swipeBtn}
              onPress={() => deleteRow(rowMap, data.item.id, data.item.id)}
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
              value={newCommentBody}
              returnKeyType='send'
            />
            {(newCommentBody.length > 0) && <AntDesignIcon style={styles.editIcon}
              name={'checkcircleo'} 
              size={30} 
              color="#BFB393"
              onPress={() => handleSubmit()}
            />}
            {editComment && <AntDesignIcon style={styles.editIcon}
              name={'closecircleo'} 
              size={30} 
              color="#AC5253"
              onPress={() => {
                setNewCommentBody('');
                setEditComment(false);
              }}
            />}
          </View>
        }
      />  
    </ScrollView>
  )
});

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    //height: '100%',
  },
  taskHeader: {
    flexDirection: 'column',
    //height: 65,
    backgroundColor: '#BFB393',
    justifyContent: 'flex-start',
  },
  taskHeaderText: {
    color: '#FFF',
    fontSize: 17,
    lineHeight: 26.89,
    fontFamily: 'SFUIText-Regular',
  },
  taskHeaderSmallText: {
    color: '#FFF',
    fontSize: 11,
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
  commentsHeading: {
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    fontFamily: 'SFUIText-Regular',
  },
  addCommentContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 19,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  input: { 
    flex: 1,
    fontSize: 17,
    lineHeight: 19.92,
    paddingRight: 15,
    color: '#000',
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
  swipeBtn: {
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
    height: '100%',
  },
  backRightBtnRightText: {
    color: '#FFF',
    textTransform: 'none',
    fontSize: 13,
    lineHeight: 15,
    fontFamily: 'SFUIText-Regular',
  },
  editIcon: {
    marginRight: 15
  }
});

export default TaskScreen;