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
import {View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import HttpService from '../../services/HttpService';
import { useAuth } from '../../contexts/auth';

interface IProducts {
  titulo: string,
  descricao: string
}

interface IRoute {
  id: number;
}

const EditItem: React.FC = () => {
  const route = useRoute()
  const [nome, setNome] = useState(route.params.product.titulo);
  const [descricao, setDescricao] = useState(route.params.product.descricao);
  const {goBack} = useNavigation();
  const navigation = useNavigation();
  const {setHasNewItem} = useAuth();

  function handlerNavigateInDashboard() {
    goBack();
  }

  function handlerEditItem() {
    HttpService.patch('product/{id}', {id: route.params.product.id}, {
      titulo: nome,
      descricao
    }).then((response: any) => {
      console.log(response)
    }).catch((err: any) => console.log(err))
    // console.log('test', descricao)
    // console.log('test', nome)
    setHasNewItem(true)
    navigation.navigate('Dashboard')
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
        <Title style={styles.title}>Editar item</Title>
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
              onChangeText={e => setDescricao(e)} value={descricao}
            />
          </Form>
        </View>
      </Content>
      <View style={styles.footer}>
        <Button block style={styles.button} onPress={handlerEditItem}>
          <Text>Editar</Text>
        </Button>
      </View>
    </Container>
  );
};

export default EditItem;
