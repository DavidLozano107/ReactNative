import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

const Header = () => (
  <>
    <Text style={styles.header}>Criptomonedas</Text>
  </>
);
const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Lato-Black',
    backgroundColor: '#5E49E2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFF',
    marginBottom: 30,
  },
});

export default Header;
