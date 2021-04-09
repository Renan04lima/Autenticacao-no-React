import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Input,
  Item,
  Button,
  Text,
} from 'native-base';
import {View} from 'react-native';
import {useAuth} from '../../contexts/auth';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const SignIn: React.FC = (prop) => {
  const {goBack} = useNavigation();

  function handlerNavigateInLogin() {
    goBack();
  }

  return (
    <Header transparent style={styles.header}>
      <Button
        transparent
        style={styles.buttonBack}
        onPress={handlerNavigateInLogin}>
        <Icon name="chevron-back" size={40} color="blue" />
      </Button>
      <Title style={styles.title}>Nova conta</Title>
      <Button transparent style={styles.buttonBack}>
        <Icon name="chevron-back" size={40} color="white" />
      </Button>
    </Header>
  );
};

export default SignIn;
