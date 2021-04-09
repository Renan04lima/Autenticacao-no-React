import React, { useState } from 'react';
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
import { Alert, View } from 'react-native';
import { useAuth, User } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { withFormik } from 'formik';
import {ResponseType} from 'axios'

import { styles } from './styles';
import HttpService from '../../services/HttpService';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const userTeste = {
    login: 'teste@gmail.com',
    senha: '123456',
  }
  function handleSignIn() {
    // signIn(userTeste)
    signIn({
      login: email,
      senha
    });
  }

  function handlerNavigateInSignUp() {
    navigate('SignUp');
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
            <Input placeholder="Usuário" onChangeText={e => { setEmail(e) }} value={email} />
          </Item>
          <Item regular style={styles.input}>
            <Input placeholder="Senha" onChangeText={e => { setSenha(e) }} value={senha} secureTextEntry />
          </Item>
          <Button block style={styles.button} onPress={handleSignIn}>
            <Text>Entrar</Text>
          </Button>
        </View>
      </Content>
      <View style={styles.footer}>
        <Button block transparent onPress={handlerNavigateInSignUp}>
          <Text>Não possui uma conta?</Text>
        </Button>
      </View>
    </Container>
  );
};

export default SignIn;
