import { StyleSheet, View, Text, Switch } from 'react-native';
import { useContext } from 'react';
import { TemaContext } from '../context/TemaContext';

export default function ConfiguracoesScreen() {
  const { dark, toggleTema } = useContext(TemaContext);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.texto}>Modo Escuro</Text>
        <Switch value={dark} onValueChange={toggleTema} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    fontSize: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#40B5AD',
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 30,
    color: 'white',
  },
});
