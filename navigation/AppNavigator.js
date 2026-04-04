import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useState, useContext } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProdutosScreen from '../screens/ProdutosScreen';
import DetalhesProdutoScreen from '../screens/DetalhesProdutoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import PedidosScreen from '../screens/PedidosScreen';
import MapaScreen from '../screens/MapaScreen';
import DetalhesRestauranteScreen from '../screens/DetalhesRestauranteScreen';
import CarrinhoScreen from '../screens/CarrinhoScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen';
import BloqueioWebScreen from '../screens/BloqueioWebScreen';

import { CarrinhoProvider } from '../context/CarrinhoContext';
import { TemaProvider, TemaContext } from '../context/TemaContext';
import Tema from '../components/Tema';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            style={styles.ajustarIconeDoCarrinho}
            onPress={() => navigation.navigate('Carrinho')}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Produtos" component={ProdutosScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesProdutoScreen} />
    </Stack.Navigator>
  );
}

function MapaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mapa" component={MapaScreen} />
      <Stack.Screen
        name="Detalhes do Restaurante"
        component={DetalhesRestauranteScreen}
      />
    </Stack.Navigator>
  );
}

function CarrinhoECheckoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let nomeDoIcone;
          if (route.name === 'HomeTab') {
            nomeDoIcone = 'home-outline';
          } else if (route.name === 'PedidosTab') {
            nomeDoIcone = 'receipt-outline';
          } else if (route.name === 'MapaTab') {
            nomeDoIcone = 'map-outline';
          } else if (route.name === 'PerfilTab') {
            nomeDoIcone = 'person-outline';
          } else if (route.name === 'ConfiguracoesTab') {
            nomeDoIcone = 'settings-outline';
          }
          return <Ionicons name={nomeDoIcone} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="PedidosTab"
        component={PedidosScreen}
        options={{ title: 'Pedidos' }}
      />
      <Tab.Screen
        name="MapaTab"
        component={MapaStack}
        options={{ title: 'Mapa' }}
      />
      <Tab.Screen
        name="PerfilTab"
        component={PerfilScreen}
        options={{ title: 'Perfil' }}
      />
      <Tab.Screen
        name="ConfiguracoesTab"
        component={ConfiguracoesScreen}
        options={{ title: 'Configurações' }}
      />
    </Tab.Navigator>
  );
}

function NavegacaoInfnetFood() {
  const [logado, setLogado] = useState(false);
  const { dark } = useContext(TemaContext);

  if (Platform.OS === 'web') {
    return <BloqueioWebScreen />;
  }

  return (
    <Tema>
      <NavigationContainer
        theme={
          dark
            ? {
                ...DarkTheme,
                colors: {
                  ...DarkTheme.colors,
                  background: 'transparent',
                  card: '#1f1f1f',
                  text: '#ffffff',
                },
              }
            : {
                ...DefaultTheme,
                colors: {
                  ...DefaultTheme.colors,
                  background: 'transparent',
                },
              }
        }>
        <Stack.Navigator>
          {logado ? (
            <>
              <Stack.Screen
                name="InfnetFood"
                component={Tabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Carrinho"
                component={CarrinhoECheckoutStack}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              initialParams={{ setLogado: setLogado }}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Tema>
  );
}

export default function AppNavigator() {
  return (
    <TemaProvider>
      <CarrinhoProvider>
        <NavegacaoInfnetFood />
      </CarrinhoProvider>
    </TemaProvider>
  );
}

const styles = StyleSheet.create({
  ajustarIconeDoCarrinho: {
    marginRight: 5,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: '#C1E1C1',
  },
});
