import { StyleSheet, View, Text } from 'react-native';

export default function TelaBloqueioWeb() {
  return (
    <View style={styles.container}>
      <View style={styles.containerErro}>
        <Text style={styles.titulo}>Erro</Text>
        <Text style={styles.texto}>
          Você está acessando a aplicação via WEB.
        </Text>
        <Text style={styles.texto}>
          Para utilizar o aplicativo, acesse em um dispositivo mobile para que
          todas as funcionalidades funcionem corretamente :)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
    padding: 20,
  },
  containerErro: {
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
