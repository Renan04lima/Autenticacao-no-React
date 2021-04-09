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
import {Alert, View} from 'react-native';
import {useAuth} from '../../contexts/auth';
import {useNavigation} from '@react-navigation/native';
import HttpService from '../../services/HttpService';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUp: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const {signIn, signUp} = useAuth();
  const {goBack} = useNavigation();
  
  function handleSignUp() {
    signUp({
      nome,
      login: email,
      senha
    })
    // HttpService.insert('user/', {
    //   nome,
    //   login: email,
    //   senha
    // }).then((response: any)=> {
    //   console.log(response) 
    // }).catch(()=>Alert.alert('Erro', 'Error ao cadastrar'))
  }


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
            <Input placeholder="Nome" onChangeText={e => setNome(e)} value={nome} />
          </Item>
          <Item regular style={styles.input}>
            <Input placeholder="Email" onChangeText={e => setEmail(e)} value={email} />
          </Item>
          <Item regular style={styles.input}>
            <Input placeholder="Senha" onChangeText={e => setSenha(e)} value={senha}/>
          </Item>
        </View>
      </Content>
      <View style={styles.footer}>
        <Button block style={styles.button} onPress={handleSignUp}>
          <Text>Cadastrar</Text>
        </Button>
      </View>
    </Container>
  );
};

export default SignUp;
