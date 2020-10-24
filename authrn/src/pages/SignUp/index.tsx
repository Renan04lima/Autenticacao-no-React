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

const SignIn: React.FC = () => {
  const {signIn} = useAuth();

  function handleSign() {
    signIn();
  }

  const {goBack} = useNavigation();

  function handlerNavigateInLogin() {
    goBack();
  }

  return (
    <Container>
      <Header transparent style={styles.header}>
        <Button
          transparent
          style={styles.buttonBack}
          onPress={handlerNavigateInLogin}>
          <Icon name="chevron-back" size={30} color="#003e8b" />
        </Button>
        <Title style={styles.title}>Nova conta</Title>
        <Button transparent style={styles.buttonBack}>
          <Icon name="chevron-back" size={30} color="white" />
        </Button>
      </Header>
      <Content padder contentContainerStyle={styles.content}>
        <View style={styles.boxLogin}>
          <Item regular style={styles.input}>
            <Input placeholder="Nome" />
          </Item>
          <Item regular style={styles.input}>
            <Input placeholder="Email" />
          </Item>
          <Item regular style={styles.input}>
            <Input placeholder="Senha" />
          </Item>
        </View>
      </Content>
      <View style={styles.footer}>
        <Button block style={styles.button} onPress={handleSign}>
          <Text>Cadastrar</Text>
        </Button>
      </View>
    </Container>
  );
};

export default SignIn;
