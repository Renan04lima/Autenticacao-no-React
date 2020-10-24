import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    padding: 50,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
  },
  content: {
    flex: 1,
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 13,
  },
  boxCard: {
    margin: 10,
    flex: 1,
  },
  boxButton: {
    // backgroundColor: '#003e8b',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
});
