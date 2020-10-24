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
  Textarea,
  Form,
} from 'native-base';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const EditItem: React.FC = () => {
  const {goBack} = useNavigation();

  function handlerNavigateInDashboard() {
    goBack();
  }

  function handlerEditItem() {
    goBack();
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
            <Input placeholder="Nome" />
          </Item>
          <Form>
            <Textarea
              style={styles.input}
              underline
              rowSpan={5}
              bordered
              placeholder="Descrição"
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
