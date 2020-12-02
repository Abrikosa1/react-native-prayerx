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
  },
  button: {
    height: 30,
    backgroundColor: '#BFB393',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  rightLeftPadding: {
    paddingRight: 15,
    paddingLeft: 15,
  },
})