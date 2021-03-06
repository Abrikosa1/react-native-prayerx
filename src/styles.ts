import { StyleSheet } from "react-native";

export const initStyles = StyleSheet.create({
  input: { 
    fontSize: 14,
    height: 50, 
    borderColor: '#E5E5E5', 
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    fontFamily: 'SFUIText-Regular',
  },
  button: {
    height: 30,
    backgroundColor: '#BFB393',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'SFUIText-Regular',
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontFamily: 'SFUIText-Bold',
    fontSize: 12,
    lineHeight: 14,
  },
  rightLeftPadding: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  heading: {
    fontSize: 32,
    alignSelf: 'center',
    marginTop: 25,
    textTransform: 'uppercase',
    fontFamily: 'SFUIText-Semibold',
  },
})