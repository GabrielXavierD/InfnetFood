import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function CardPerfil({ user }) {
  return (
    <View style={styles.card}>
      <View style={styles.conteudo}>
        <Text style={styles.nome}>
          <Ionicons name={'person-circle-outline'} size={40} color={'black'} />
          {user.nome}
        </Text>
        <Text style={styles.tituloSessao}>Email</Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#ECFFDC',
    borderRadius: 16,
    marginBottom: 16,
  },
  conteudo: {
    padding: 16,
  },
  nome: {
    height: 50,
    width: '100%',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  tituloSessao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
});
