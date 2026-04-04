import { useState, useEffect, useContext } from 'react';
import * as Notifications from 'expo-notifications';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function CheckoutScreen({ navigation, route }) {
  const { total } = route.params;
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
    <View style={styles.container}>
      <View style={styles.containerCheckout}>
        <Text style={styles.titulo}>Checkout</Text>
        <Text style={styles.totalTexto}>Total: R$ {total.toFixed(2) || 0}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
  },
  containerCheckout: {
    padding: 10,
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
});
