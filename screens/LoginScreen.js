import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

export default function LoginScreen({ route }) {
  const { setLogado } = route.params;
  const [form, setForm] = useState({
    email: '',
    senha: '',
  });
  const [erro, setErro] = useState('');
  const usuarioMock = {
    email: 'teste@teste.com',
    senha: '123',
  };

  function verificarLogin() {
    if (form.email !== usuarioMock.email || form.senha !== usuarioMock.senha) {
      setErro('Preencha os campos "Email" e "Senha" com dados válidos.');
      return;
    }
    setErro('');
    setLogado(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Login</Text>
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(texto) => setForm({ ...form, email: texto })}
        style={styles.inputLogin}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={form.senha}
        onChangeText={(texto) => setForm({ ...form, senha: texto })}
        style={styles.inputLogin}
      />
      {erro ? <Text style={styles.erro}>{erro}</Text> : ''}
      <Pressable style={styles.botao} onPress={verificarLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botao: {
    backgroundColor: 'green',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputLogin: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  erro: {
    color: 'red',
    marginBottom: 5,
  },
});
