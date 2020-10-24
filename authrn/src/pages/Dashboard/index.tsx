import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Text,
  Right,
  Body,
  Card,
  Thumbnail,
} from 'native-base';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../contexts/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import Img from '../../assets/img.jpg';

Icon.loadFont();

const Dashboard: React.FC = () => {
  const {user, signOut} = useAuth();
  const {navigate} = useNavigation();

  function handlerNavigateInNewItem() {
    navigate('NewItem');
  }

  function handlerNavigateInEditItem() {
    navigate('EditItem');
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <Container>
      <Header style={styles.header}>
        <Body>
          <Title style={styles.title}>Olá. {user?.name}</Title>
        </Body>
        <Right>
          <Button transparent onPress={handleSignOut}>
            <Text>Sair</Text>
          </Button>
        </Right>
      </Header>
      <Content padder contentContainerStyle={styles.content}>
        <View style={styles.box1}>
          <Text style={styles.title}>Produtos</Text>
          <Button style={styles.button} onPress={handlerNavigateInNewItem}>
            <Text>Novo</Text>
          </Button>
        </View>
        <Card style={styles.card}>
          <Thumbnail square large source={Img} />
          <View style={styles.boxCard}>
            <Text style={styles.text}>Nome do item</Text>
            <Text style={styles.cardText}>Breve descrição do produto</Text>
          </View>
          <View style={styles.boxButton}>
            <Icon
              onPress={handlerNavigateInEditItem}
              name="edit"
              size={20}
              color="#003e8b"
            />
            <Icon name="delete" size={20} color="red" />
          </View>
        </Card>
      </Content>
    </Container>
  );
};

export default Dashboard;
