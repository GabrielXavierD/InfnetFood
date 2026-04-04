import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getReceitasDummyJson } from '../services/Api';

export default function ProdutosScreen({ route, navigation }) {
  const { categoriaNome } = route.params;
  const [produtos, setProdutos] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        setEstaCarregando(true);
        const receitas = await getReceitasDummyJson();

        const filtrados = receitas.filter(
          (receita) => receita.cuisine === categoriaNome
        );

        const produtosFormatados = filtrados.map((item) => ({
          id: item.id.toString(),
          nome: item.name,
          descricao: item.instructions?.[0] || 'Sem descrição',
          ingredientes: item.ingredients,
          imagem: item.image,
          preco: gerarPreco(item),
        }));

        setProdutos(produtosFormatados);
      } catch (erro) {
        Alert.alert(
          'Erro',
          'Erro ao carregar produtos. Por favor, tente novamente.'
        );
        console.error('Erro ao carregar produtos:', erro);
      } finally {
        setEstaCarregando(false);
      }
    }

    carregar();
  }, [categoriaNome]);

  function gerarPreco(item) {
    return item.ingredients.length * 2 + 10;
  }

  if (estaCarregando) {
    return (
      <View style={styles.containerCentralizado}>
        <ActivityIndicator size="large" color="#7F6244" />
        <Text style={styles.carrengado}>Carregando pratos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{categoriaNome}</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoria}
            onPress={() => navigation.navigate('Detalhes', { produto: item })}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <Text style={styles.produtoTexto}>{item.nome}</Text>
            <Text style={styles.produtoTexto}>R$ {item.preco.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>
            Nenhum produto encontrado nesta categoria.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 18,
    width: '50%',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#EADDCA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imagem: {
    width: '100%',
    height: 160,
    borderRadius: 6,
  },
  produtoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoria: {
    padding: 15,
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#C4A484',
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  carrengado: {
    marginTop: 10,
  },
});
