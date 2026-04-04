import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function MapaScreen({ navigation }) {
  const [selecionado, setSelecionado] = useState(null);
  const restaurantesCentroDoRio = [
    {
      nome: 'Confeitaria Colombo',
      descricao:
        'Fundada em 1894, é um dos maiores símbolos do Rio Antigo. Sua arquitetura impressiona com enormes espelhos belgas, vitrais e mobiliário em jacarandá. É famosa pelo seu chá da tarde imperial e doces clássicos como o quindim e a bomba de chocolate, sendo eleita uma das confeitarias mais bonitas do mundo.',
      coordenadas: { latitude: -22.9051, longitude: -43.1782 },
      nota: 4.6,
      endereco: 'Rua Gonçalves Dias, 32 - Centro, Rio de Janeiro - RJ',
      itemCardapio:
        'Chá Dona Carmem (Individual): Chá, geleia da casa, pasta de queijo branco, mel, manteiga, doce Colombo, torrada Petrópolis e suco de laranja.',
    },
    {
      nome: 'Rio Minho',
      descricao:
        'Estabelecido em 1884, detém o título de restaurante mais antigo da cidade. Especializado em frutos do mar, o local é o berço da famosa Sopa Leão Veloso. O ambiente é nostálgico, frequentado historicamente por figuras ilustres da política e literatura brasileira, mantendo a tradição do serviço de mesa clássico.',
      coordenadas: { latitude: -22.9022, longitude: -43.1748 },
      nota: 4.4,
      endereco: 'Rua do Ouvidor, 10 - Centro, Rio de Janeiro - RJ',
      itemCardapio:
        'Sopa Leão Veloso: Caldo de frutos do mar (peixe, camarão, lula, mexilhão e lagostinha), criação histórica da casa.',
    },
    {
      nome: 'Casa Cavé',
      descricao:
        'Inaugurada em 1860 pelo francês Charles Auguste Cavé, é a confeitaria mais antiga do Rio de Janeiro. O local preserva uma atmosfera de "túnel do tempo" com influências europeias, servindo receitas tradicionais portuguesas, como o autêntico pastel de nata e o bolo-rei, em um casarão histórico na esquina da Rua Sete de Setembro.',
      coordenadas: { latitude: -22.9056, longitude: -43.1793 },
      nota: 4.2,
      endereco: 'Rua Sete de Setembro, 133 - Centro, Rio de Janeiro - RJ',
      itemCardapio:
        'Pastel de Belém: Tradicional doce português folhado com creme de ovos, polvilhado com canela e açúcar.',
    },
    {
      nome: 'Cais do Oriente',
      descricao:
        'Ocupa um sofisticado casarão de 1878 que funcionava como armazém de especiarias. O projeto arquitetônico mescla paredes de pedra originais com decoração rústica-chique. O cardápio oferece culinária contemporânea com ingredientes brasileiros, sendo um destino muito procurado para jantares românticos e eventos na região do Boulevard Olímpico.',
      coordenadas: { latitude: -22.9015, longitude: -43.1765 },
      nota: 4.5,
      endereco: 'Rua Visconde de Itaboraí, 8 - Centro, Rio de Janeiro - RJ',
      itemCardapio:
        'Polvo Grelhado: Servido com purê de aipim, páprica doce e legumes da estação.',
    },
    {
      nome: 'Nova Capela',
      descricao:
        'Um bastião da boemia carioca na Lapa. É mundialmente conhecido pelo seu cabrito assado com arroz de brócolis e o bolinho de bacalhau, considerado um dos melhores da cidade. O restaurante mantém garçons de carreira e um salão tradicional que atravessa gerações de clientes fiéis.',
      coordenadas: { latitude: -22.9126, longitude: -43.1812 },
      nota: 4.3,
      endereco: 'Avenida Mem de Sá, 96 - Lapa, Rio de Janeiro - RJ',
      itemCardapio:
        'Cabrito Assado: Carro-chefe da casa, servido com arroz de brócolis e batatas coradas.',
    },
    {
      nome: 'Angu do Gomes',
      descricao:
        'O que começou como uma carrocinha de comida de rua nos anos 50 no Largo da Prainha, tornou-se um restaurante fixo indispensável. Sua especialidade é o angu à base de fubá com variados guisados de carne (moela, carne moída ou miúdos), representando a essência da gastronomia popular da Zona Portuária.',
      coordenadas: { latitude: -22.8974, longitude: -43.1831 },
      nota: 4.5,
      endereco:
        'Rua Sacadura Cabral, 75 - Saúde (Largo da Prainha), Rio de Janeiro - RJ',
      itemCardapio:
        'Angu Tradicional: Creme de fubá servido com miúdos de boi (fígado, coração, língua e lombo).',
    },
    {
      nome: 'Café Gaúcho',
      descricao:
        'Famoso pelo seu balcão icônico e serviço ágil, é o ponto de encontro clássico no centro para um café rápido. Os destaques são o "joelho" (salgado de presunto e queijo) e o café com leite, servidos em uma atmosfera retrô que pouco mudou ao longo das décadas, mantendo o charme do cotidiano carioca.',
      coordenadas: { latitude: -22.9018, longitude: -43.1788 },
      nota: 4.4,
      endereco: 'Rua São José, 86 - Centro, Rio de Janeiro - RJ',
      itemCardapio:
        'Sanduíche de Linguiça: Servido no pão francês com molho vinagrete de cebola, um clássico do happy hour.',
    },
    {
      nome: 'Galeto Senador',
      descricao:
        'Uma das galeterias mais tradicionais da região da Rua do Ouvidor e Senador Dantas. O foco é a eficiência e o sabor: galetos assados na brasa, servidos com acompanhamentos clássicos como farofa de ovos e batata portuguesa. É o destino preferido para o almoço executivo rápido de quem trabalha no Centro.',
      coordenadas: { latitude: -22.9029, longitude: -43.1802 },
      nota: 4.3,
      endereco: 'Rua Senador Dantas, 40, loja A - Centro, Rio de Janeiro - RJ',
      itemCardapio:
        'Galeto Especial para Dois: Galeto assado na brasa, acompanhado de arroz de brócolis, fritas, farofa e molho à campanha.',
    },
    {
      nome: 'Opus Rio',
      descricao:
        'Opus é uma lanchonete clássica de balcão que se tornou uma lenda urbana carioca. Diferente dos restaurantes luso-brasileiros da região, o foco aqui é a rapidez, a fartura e uma combinação de sabores que virou marca registrada.',
      coordenadas: { latitude: -22.9021, longitude: -43.1772 },
      nota: 4.5,
      endereco: 'Rua Gonçalves Dias, 80 - Centro, Rio de Janeiro - RJ',
      itemCardapio:
        'Sanduíche de Pernil com Abacaxi e Queijo Provolone: O item mais famoso da casa, servido em pão francês crocante.',
    },
    {
      nome: 'Casa Paladino',
      descricao:
        'Fundada em 1906, funciona como armazém e bar. Suas prateleiras de madeira originais abrigam vinhos e mantimentos, enquanto as mesas servem omeletes famosas e sanduíches clássicos de queijo do reino com presunto. É um dos poucos lugares que preservam intacto o espírito comercial do início do século XX.',
      coordenadas: { latitude: -22.9027, longitude: -43.1824 },
      nota: 4.6,
      endereco: 'Rua Uruguaiana, 224 - Centro, Rio de Janeiro - RJ',
      itemCardapio:
        'Sanduíche Triplo: Combinação tradicional de presunto, queijo do reino e ovo frito no pão francês.',
    },
  ];
  const MapView = require('react-native-maps').default;
  const { Marker, PROVIDER_GOOGLE } = require('react-native-maps');
  const regiaoInicialDoMapa = {
    latitude: -22.905,
    longitude: -43.18,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapa}
        initialRegion={regiaoInicialDoMapa}>
        {restaurantesCentroDoRio.map((restaurante) => (
          <Marker
            key={restaurante.nome}
            coordinate={restaurante.coordenadas}
            onPress={() => setSelecionado(restaurante)}
          />
        ))}
      </MapView>
      {selecionado && (
        <View style={styles.card}>
          <Text style={styles.titulo}>{selecionado.nome}</Text>
          <Text>Nota: {selecionado.nota}</Text>
          <View style={styles.containerBtns}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() =>
                navigation.navigate('Detalhes do Restaurante', {
                  restaurante: selecionado,
                })
              }>
              <Text style={styles.textoBotao}>Ver detalhes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.botaoFechar]}
              onPress={() => setSelecionado(null)}>
              <Text style={styles.textoBotao}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapa: {
    height: '100%',
  },
  card: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#FFF8DC',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  botao: {
    backgroundColor: '#6F4E37',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  botaoFechar: {
    backgroundColor: '#C19A6B',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerBtns: {
    marginTop: 10,
    gap: 5,
  },
});
