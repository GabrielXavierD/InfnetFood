import { StyleSheet, View, Text, FlatList } from 'react-native';

export default function PedidosScreen() {
  const listaPedidos = [
    {
      id: '1',
      numeroDoPedido: '1',
      tempoDeEntrega: '20 minutos',
      itens: [
        { id: '1', nome: 'X-Burguer', quantidade: 1, preco: 25.0 },
        { id: '2', nome: 'X-Salada', quantidade: 2, preco: 28.0 },
        { id: '3', nome: 'Suco de Uva', quantidade: 1, preco: 12.0 },
      ],
    },
    {
      id: '2',
      numeroDoPedido: '2',
      tempoDeEntrega: '10 minutos',
      itens: [
        { id: '1', nome: 'Sorvete de morango', quantidade: 1, preco: 10.0 },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={listaPedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item: pedido }) => {
          const totalPedido = pedido.itens.reduce(
            (soma, item) => soma + item.preco * item.quantidade,
            0
          );
          return (
            <View style={styles.cardUnico}>
              <Text style={styles.tituloCard}>
                Pedido {pedido.numeroDoPedido}
              </Text>
              <View style={styles.divisor} />

              {pedido.itens.map((item) => (
                <View key={item.id} style={styles.linhaItem}>
                  <Text style={styles.textoNome}>{item.nome}</Text>
                  <Text style={styles.textoQuantidade}>
                    Quantidade: {item.quantidade}
                  </Text>
                  <Text style={styles.textoPreco}>
                    R$ {item.preco.toFixed(2)}
                  </Text>
                </View>
              ))}

              <View style={styles.divisor} />
              <View style={styles.linhaTotal}>
                <Text style={styles.textoTotal}>Total:</Text>
                <Text style={styles.valorTotal}>
                  R$ {totalPedido.toFixed(2)}
                </Text>
              </View>
              <Text style={styles.tempoEntrega}>
                A entrega será realizada em {pedido.tempoDeEntrega}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  cardUnico: {
    backgroundColor: '#EADDCA',
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  tituloCard: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tempoEntrega: {
    fontSize: 14,
    color: '#E67E22',
    fontWeight: '600',
    marginTop: 2,
  },
  divisor: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
  },
  linhaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  textoNome: {
    flex: 2,
    fontSize: 16,
    color: '#444',
  },
  textoQuantidade: {
    flex: 2,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  textoPreco: {
    flex: 2,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
    color: '#333',
  },
  linhaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  textoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  valorTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
  },
});
