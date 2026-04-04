import { StyleSheet, View, Text, Pressable } from 'react-native';

export default function DetalhesRestauranteScreen({ route }) {
  const { restaurante } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.containerDetalhes}>
        <Text style={styles.nome}>{restaurante.nome}</Text>
        <Text style={styles.preco}>{restaurante.endereco}</Text>
        <Text style={styles.preco}>Nota: {restaurante.nota}</Text>
        <Text style={styles.descricao}>Descrição: {restaurante.descricao}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.cardDescricao,
            {
              backgroundColor: pressed ? '#E8F5E9' : '#fff',
            },
          ]}>
          {({ pressed }) => (
            <>
              <Text style={styles.textoExemplo}>
                Exemplo de um item do cardápio:
              </Text>
              <Text
                style={[
                  styles.itemTexto,
                  { fontStyle: pressed ? 'italic' : 'normal' },
                ]}>
                - {restaurante.itemCardapio}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerDetalhes: {
    backgroundColor: '#FFF8DC',
    padding: 20,
    borderRadius: 10,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preco: {
    fontSize: 18,
    marginBottom: 10,
  },
  descricao: {
    textAlign: 'justify',
    marginBottom: 15,
  },
  cardDescricao: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textoExemplo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemTexto: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});
