import { StyleSheet, View, StatusBar } from 'react-native';
import { useContext } from 'react';
import { TemaContext } from '../context/TemaContext';

export default function Tema({ children }) {
  const { dark } = useContext(TemaContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: dark ? '#121212' : '#ecf0f1' },
      ]}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
