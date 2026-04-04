import { StyleSheet, View } from 'react-native';
import CardPerfil from '../components/CardPerfil';

export default function Perfil() {
  const usuarioMock = {
    nome: 'João Pereira',
    email: 'joao@teste.com',
  };

  return (
    <View style={styles.container}>
      <CardPerfil user={usuarioMock} />
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
});
