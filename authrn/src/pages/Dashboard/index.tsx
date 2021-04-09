import React, { useEffect, useState } from 'react';
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
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import Img from '../../assets/img.jpg';
import HttpService from '../../services/HttpService'

Icon.loadFont();

interface IProducts {
  id: number,
  titulo: string,
  descricao: string
}

const Dashboard: React.FC = () => {
  const { user, signOut, hasNewItem, setHasNewItem } = useAuth();
  const [products, setProducts] = useState<IProducts[]>([]);
  const [update, setUpdate] = useState(0);
  const { navigate } = useNavigation();

  function handlerNavigateInNewItem() {
    navigate('NewItem');
  }

  function handlerNavigateInEditItem(product: IProducts) {
    navigate('EditItem', {product});
  }

  function handleSignOut() {
    signOut();
  }

  async function showProducts() {
    await HttpService.list('product/', { id: user?.id })
      .then((response: any) => {
        // console.log('list', response.data);
        setProducts(response.data)
      }).catch((err: any) => console.log('error', err))
  }

  useEffect(() => {
    showProducts()
    setHasNewItem(false)
  }, [hasNewItem])

  return (
    <Container>
      <Header style={styles.header}>
        <Body>
          <Title style={styles.title}>Olá. {user?.nome}</Title>
        </Body>
        <Right>
          <Button transparent onPress={handleSignOut}>
            <Text>Sair</Text>
          </Button>
        </Right>
      </Header>
      <Content padder contentContainerStyle={styles.content} enableResetScrollToCoords={true}>
        <View style={styles.box1}>
          <Text style={styles.title}>Produtos</Text>
          <Button style={styles.button} onPress={handlerNavigateInNewItem}>
            <Text>Novo</Text>
          </Button>
        </View>
        {
          products.map((product) => (
            <Card style={styles.card} key={product.id}>
              <Thumbnail square large source={Img} />
              <View style={styles.boxCard}>
                <Text style={styles.text}>{product.titulo}</Text>
                <Text style={styles.cardText}> {product.descricao} </Text>
              </View>
              <View style={styles.boxButton}>
                <Icon
                  onPress={()=>{handlerNavigateInEditItem(product)}}
                  name="edit"
                  size={20}
                  color="#545c66"
                />
                <Icon name="delete" size={20} color="red" />
              </View>
            </Card>
          ))
        }
      </Content>
    </Container>
  );
};

export default Dashboard;
