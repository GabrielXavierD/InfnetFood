import { Alert } from 'react-native';
const DUMMYJSON_RECEITAS = 'https://dummyjson.com/recipes';

export async function getReceitasDummyJson() {
  try {
    const resposta = await fetch(DUMMYJSON_RECEITAS);
    if (!resposta.ok) {
      throw new Error('Erro ao buscar receitas');
    }
    const data = await resposta.json();
    return data.recipes;
  } catch (erro) {
    Alert.alert('Erro', 'Erro ao buscar receitas. Por favor, tente novamente.');
    console.log('Erro ao realizar requisição na API do DummyJson:', erro);
    throw erro;
  }
}

