import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useContext } from 'react';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function CarrinhoScreen({ navigation }) {
  const { carrinho, removerItem, adicionarQuantidade, diminuirQuantidade } =
    useContext(CarrinhoContext);

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}>
      <View style={styles.containerCarrinho}>
        <Text style={styles.paragraph}>Carrinho</Text>
        <Text style={styles.totalTexto}>Total: R$ {total.toFixed(2) || 0}</Text>

        <FlatList
          scrollEnabled={false}
          data={carrinho}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={styles.itemContainer}>
                <View style={styles.colunaDados}>
                  <Text style={styles.nomeProduto}>{item.nome}</Text>
                  <Text style={styles.quantiaTexto}>
                    Quantia: {item.quantidade}
                  </Text>
                  <Text style={styles.precoTexto}>
                    R${(item.preco * item.quantidade).toFixed(2)}
                  </Text>
                </View>

                <View style={styles.containerBotoes}>
                  <TouchableOpacity
                    style={[styles.btnQtd, styles.btnRemover]}
                    onPress={() => removerItem(item.id)}>
                    <Text style={styles.textoBotao}>X</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btnQtd, styles.btnAdicionar]}
                    onPress={() => adicionarQuantidade(item.id)}>
                    <Text style={styles.textoBotao}>+</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btnQtd, styles.btnDiminuir]}
                    onPress={() => diminuirQuantidade(item.id)}>
                    <Text style={styles.textoBotao}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.separador} />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.textoVazio}>
              Não há produtos no carrinho no momento.
            </Text>
          }
        />

        {carrinho.length > 0 && (
          <TouchableOpacity
            style={styles.botaoFinalizar}
            onPress={() => navigation.navigate('Checkout', { total })}>
            <Text style={styles.botaoTexto}>Realizar Pedido</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    padding: 10,
    paddingBottom: 40,
  },
  containerCarrinho: {
    backgroundColor: '#FFF8DC',
    padding: 20,
    borderRadius: 10,
  },
  paragraph: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  separador: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 5,
  },
  colunaDados: {
    flex: 1,
  },
  nomeProduto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantiaTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  precoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerBotoes: {
    flexDirection: 'row',
    gap: 10,
  },
  btnQtd: {
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnRemover: {
    backgroundColor: '#e74c3c',
  },
  btnAdicionar: {
    backgroundColor: '#2ecc71',
  },
  btnDiminuir: {
    backgroundColor: '#f39c12',
  },
  botaoFinalizar: {
    backgroundColor: '#2ecc71',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});
