import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
  },
  boxLogin:{
    // backgroundColor: "blue",    
    justifyContent: "space-around",
    flex: 0.5,
  },
  button:{
    borderRadius: 5,
  },
  text:{
    alignSelf:"center",
    fontSize:25
  },
  input:{
    borderRadius: 5
  },
  color: {
    color: "#003e8b"
  },
  footer: {
    padding: 10,
    paddingBottom: 10
  }
});