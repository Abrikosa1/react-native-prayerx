import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initStyles } from '../styles';
import { Comment, User } from '../types';

interface IProps {
  comment: Comment;
  user: User;
}

const CommentComponent: React.FC<IProps> = ({comment, user}) => {
  const date: Date = new Date(comment.created);
  const daysLag = Math.ceil(Math.abs(date.getTime() - Date.now()) / (1000 * 3600 * 24));
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  const maybePluralize = (count: number, noun: string, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;
  return(
    <View style={[styles.commentContainer, initStyles.rightLeftPadding]}>
      <View style={styles.commentAuthorIcon}></View>
      <View>
        <View style={styles.authorAndCreatedTime}>
          <Text style={[styles.commentCommonText, styles.commentAuthor]}>{user.name}</Text>
          <Text style={[styles.createdTime]}>{daysLag === 0 ?  `created today at ${time}` : `created ${maybePluralize(daysLag, 'day')} ago`}</Text>
        </View>
        <Text style={[styles.commentCommonText, styles.commentText]}>{comment.body}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  commentContainer: {
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor:'#FFF',
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  commentAuthorIcon: {
    backgroundColor: 'gray',
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 25,
  },
  authorAndCreatedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  createdTime: {
    fontSize: 13,
    lineHeight: 15.51,
    fontWeight: '400',
    color: '#9C9C9C',
    marginLeft: 6,
    fontFamily: 'SFUIText-Regular',
  },
  commentCommonText: {
    fontSize: 17,
    lineHeight: 20,
    color: '#514D47',
  },
  commentAuthor: {
    //fontWeight: '600',
    fontFamily: 'SFUIText-Semibold'
  },
  commentText: {
    //fontWeight: '400',
    fontFamily: 'SFUIText-Regular'
  }
})
export default CommentComponent;