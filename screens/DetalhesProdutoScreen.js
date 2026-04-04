import { useState, useContext } from 'react';
import { CarrinhoContext } from '../context/CarrinhoContext';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
  Alert,
} from 'react-native';

export default function DetalhesProdutosScreen({ route }) {
  const { adicionarItem } = useContext(CarrinhoContext);
  const { produto } = route.params;
  const [quantidade, setQuantidade] = useState(1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}>
      <View style={styles.containerProduto}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Image source={{ uri: produto.imagem }} style={styles.imagem} />
        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
        <Text style={styles.descricao}>{produto.descricao}</Text>
        <Text style={styles.titulo}>Ingredientes:</Text>
        {produto.ingredientes.map((item, index) => (
          <Text key={index}>• {item}</Text>
        ))}

        <View style={styles.qtdContainer}>
          <Text style={styles.titulo}>Quantidade:</Text>
          <Pressable
            style={({ pressed }) => [
              styles.btnQtd,
              { backgroundColor: pressed ? '#FF3131' : 'white' },
            ]}
            onPress={() => quantidade > 1 && setQuantidade(quantidade - 1)}>
            <Text>-</Text>
          </Pressable>
          <Text style={styles.qtd}>{quantidade}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.btnQtd,
              { backgroundColor: pressed ? '#4CBB17' : 'white' },
            ]}
            onPress={() => quantidade < 50 && setQuantidade(quantidade + 1)}>
            <Text>+</Text>
          </Pressable>
        </View>

        <Text style={styles.titulo}>
          Valor a pagar: R$ {(produto.preco * quantidade).toFixed(2)}
        </Text>

        <Pressable
          onPress={() => {
            adicionarItem(produto, quantidade);
            Alert.alert('Sucesso', 'Item adicionado ao carrinho!');
          }}
          style={({ pressed }) => [
            styles.botao,
            { backgroundColor: pressed ? '#C1E1C1' : '#6F4E37' },
          ]}>
          <Text style={styles.botaoTexto}>
            Adicionar {quantidade} '{produto.nome}' no carrinho
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  containerProduto: {
    backgroundColor: '#FFF8DC',
    padding: 20,
    borderRadius: 10,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#FFBF00',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  preco: {
    fontSize: 18,
    marginBottom: 10,
  },
  descricao: {
    marginBottom: 15,
  },
  titulo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginVertical: 20,
  },
  btnQtd: {
    backgroundColor: '#eee',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  qtd: {
    fontSize: 18,
  },
  botao: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 4,
  },
  botaoTexto: {
    color: '#fff',
  },
  imagem: {
    width: '100%',
    height: 160,
    borderRadius: 6,
    marginVertical: 5,
  },
});
