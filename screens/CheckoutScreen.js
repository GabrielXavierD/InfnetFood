import { useState, useEffect, useContext } from 'react';
import * as Notifications from 'expo-notifications';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function CheckoutScreen({ navigation, route }) {
  const { carrinho, total } = route.params;
  const { limparCarrinho } = useContext(CarrinhoContext);
  const [form, setForm] = useState({
    endereco: '',
    pagamento: '',
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function pedirPermissao() {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão Negada',
            'Permissão de notificação negada! Por favor, aceite e tente novamente.'
          );
        }
      } catch (erro) {
        console.error('Erro ao solicitar permissão de notificações:', erro);
      }
    }
    pedirPermissao();
  }, []);

  async function enviarNotificacao() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `O seu pedido de R$${total.toFixed(2)} foi confirmado!`,
        body: 'Status: Seu pedido foi recebido e está sendo preparado.',
      },
      trigger: null,
    });
  }

  function alterarValorNoCampo(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function finalizarPedido() {
    if (!form.endereco || !form.pagamento) {
      setErro(
        'Preencha os campos "Endereço" e "Forma de pagamento" com dados válidos.'
      );
      return;
    }
    setErro('');
    Alert.alert('Sucesso', 'Pedido realizado!');
    enviarNotificacao();
    navigation.navigate('InfnetFood', {
      screen: 'PedidosTab',
    });
    limparCarrinho();
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}>
      >
      <View style={styles.containerCheckout}>
        <Text style={styles.titulo}>Checkout</Text>
        <Text style={styles.totalTexto}>Total: R$ {total.toFixed(2) || 0}</Text>
        <Text style={styles.titulo}>Resumo do Pedido:</Text>
        <View style={styles.itemContainer}>
          {carrinho.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <Text style={styles.quantiaTexto}>
                Quantia: {item.quantidade}
              </Text>
              <Text style={styles.precoTexto}>
                R${(item.preco * item.quantidade).toFixed(2)}
              </Text>
              <View style={styles.separador} />
            </View>
          ))}
        </View>

        <Text>Endereço:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu endereço de entrega"
          value={form.endereco}
          onChangeText={(text) => alterarValorNoCampo('endereco', text)}
        />

        <Text>Forma de pagamento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Cartão, Pix..."
          value={form.pagamento}
          onChangeText={(text) => alterarValorNoCampo('pagamento', text)}
        />
        {erro ? <Text style={styles.erro}>{erro}</Text> : ''}

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            { backgroundColor: pressed ? '#4CBB17' : '#0BDA51' },
          ]}
          onPress={() => {
            finalizarPedido();
          }}>
          <Text style={styles.botaoTexto}>Confirmar Pedido</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 60,
  },
  containerCheckout: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#96DED1',
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  botao: {
    backgroundColor: '#333',
    padding: 15,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
  },
  erro: {
    color: 'red',
    marginBottom: 5,
  },
  listaScroll: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFF8DC',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantiaTexto: {
    fontWeight: 'bold',
    marginVertical: 2,
  },
  precoTexto: {
    fontWeight: 'bold',
    color: '#333',
  },
  separador: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginTop: 10,
    width: '100%',
  },
});
