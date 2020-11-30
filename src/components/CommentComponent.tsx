import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initStyles } from '../styles';
import { Comment } from '../types';

interface IProps {
  comment: Comment
}

const CommentComponent: React.FC<IProps> = ({comment}) => {
  return(
    <View style={[styles.commentContainer, initStyles.rightLeftPadding]}>
      <View style={styles.commentAuthorIcon}></View>
      <View>
        <Text style={[styles.commentCommonText, styles.commentAuthor]}>{comment.author}</Text>
        <Text style={[styles.commentCommonText, styles.commentText]}>{comment.text}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  commentContainer: {
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentAuthorIcon: {
    backgroundColor: 'gray',
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 25,
  },
  commentCommonText: {
    fontSize: 17,
    lineHeight: 20,
    color: '#514D47',
  },
  commentAuthor: {
    fontWeight: '600'
  },
  commentText: {
    fontWeight: '400',
  }
})
export default CommentComponent;