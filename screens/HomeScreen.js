import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { getReceitasDummyJson } from '../services/Api';

export default function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        setEstaCarregando(true);
        const receitas = await getReceitasDummyJson();
        const todasCategorias = receitas.map((receita) => receita.cuisine);
        const categoriasNaoDuplicadas = todasCategorias.filter((categoria, index) => {
          return todasCategorias.indexOf(categoria) === index;
        });

        const categoriasFormatadas = categoriasNaoDuplicadas.map((categoria) => ({
          id: categoria,
          nome: categoria,
        }));

        setCategorias(categoriasFormatadas);
      } catch (erro) {
        Alert.alert(
          'Erro',
          'Erro ao carregar lista de categorias. Por favor, tente novamente.'
        );
        console.error('Erro ao carregar lista de categorias:', erro);
      } finally {
        setEstaCarregando(false);
      }
    }

    carregar();
  }, []);

  if (estaCarregando) {
    return (
      <View style={styles.containerCentro}>
        <ActivityIndicator size="large" color="#7F6244" />
        <Text style={styles.carregando}>Buscando categorias...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Categorias</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoria}
            onPress={() =>
              navigation.navigate('Produtos', {
                categoriaNome: item.nome,
              })
            }>
            <Text style={styles.paragraph}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>Nenhuma categoria encontrada.</Text>
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
  containerCentro: {
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
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  categoria: {
    padding: 15,
    borderWidth: 2,
    marginBottom: 10,
    backgroundColor: '#7F6244',
    borderRadius: 10,
    borderColor: '#5D4037',
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  carregando: {
    marginTop: 10,
  },
});
