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
  Textarea,
  Form,
} from 'native-base';
import {Alert, View} from 'react-native';
import HttpService from '../../services/HttpService';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/auth';

const NewItem: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const {user, response, setHasNewItem} = useAuth();
  const {navigate, goBack} = useNavigation();

  function handlerNavigateInDashboard() {
    // console.log(response.token)
    goBack();
  }

   function handlerNewItem() {
     HttpService.insert('product/', {
      titulo: nome,
      descricao,
    } ).then((res: any)=> {
      console.log('response:',res) 
      // console.log('token:',response.token) 
      navigate('Dashboard')
      setHasNewItem(true)
    }).catch((err)=>console.log('Erro', err))
  }

  return (
    <Container>
      <Header transparent style={styles.header}>
        <Button
          transparent
          style={styles.buttonBack}
          onPress={handlerNavigateInDashboard}>
          <Icon name="chevron-back" size={30} color="#003e8b" />
        </Button>
        <Title style={styles.title}>Novo item</Title>
        <Button transparent style={styles.buttonBack}>
          <Icon name="chevron-back" size={30} color="white" />
        </Button>
      </Header>
      <Content padder contentContainerStyle={styles.content}>
        <View style={styles.boxLogin}>
          <Item regular style={styles.input}>
            <Input placeholder="Nome" onChangeText={e => setNome(e)} value={nome}/>
          </Item>
          <Form>
            <Textarea
              style={styles.input}
              underline
              rowSpan={5}
              bordered
              placeholder="Descrição"
              onChangeText={e =>{setDescricao(e)}}
              value={descricao}
            />
          </Form>
        </View>
      </Content>
      <View style={styles.footer}>
        <Button block style={styles.button} onPress={handlerNewItem}>
          <Text>Cadastrar</Text>
        </Button>
      </View>
    </Container>
  );
};

export default NewItem;
