import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const SignIn = () => (
  <View style={styles.container}>
    <Button title="Sign In" onPress={() => {}} />
  </View>
);

export default SignIn;