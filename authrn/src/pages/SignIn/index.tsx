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

import {styles} from './styles';

const SignIn: React.FC = () => {
  const {signIn} = useAuth();

  function handleSign() {
    signIn();
  }

  return (
    <Container>
      <Header transparent style={styles.header}>
        <Title style={styles.color}>Login</Title>
      </Header>
      <Content padder contentContainerStyle={styles.content}>
        <View style={styles.boxLogin}>
          <Text style={styles.text}>Acesse a sua conta</Text>
          <Item regular style={styles.input}>
            <Input placeholder="Usuário" />
          </Item>
          <Item regular style={styles.input}>
            <Input placeholder="Senha" />
          </Item>
          <Button block style={styles.button} onPress={handleSign}>
            <Text>Entrar</Text>
          </Button>
        </View>
      </Content>
      <View style={styles.footer}>
        <Button block transparent>
          <Text>Não possui uma conta?</Text>
        </Button>
      </View>
    </Container>
  );
};

export default SignIn;
