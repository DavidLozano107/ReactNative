import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Cotizacion = ({resultado}) => {
  console.log(resultado);

  if (Object.keys(resultado).length === 0) return null;

  return (
    <>
      <View style={styles.resultado}>
        <Text style={styles.texto}>
          <Text style={styles.span}> {resultado.PRICE} </Text>
        </Text>

        <Text style={styles.texto}>
          Precio mas alto:
          <Text style={styles.span}> {resultado.HIGHDAY} </Text>
        </Text>

        <Text style={styles.texto}>
          Precio más bajo del dia:
          <Text style={styles.span}> {resultado.LOWDAY} </Text>
        </Text>

        <Text style={styles.texto}>
          Variación últimas 24 horas:
          <Text style={styles.span}> {resultado.CHANGEPCT24HOUR}% </Text>
        </Text>

        <Text style={styles.texto}>
          últina actualizacion :
          <Text style={styles.span}> {resultado.LASTUPDATE} </Text>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5E49E4',
  },
  texto: {
    color: '#FFF',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  precio: {
    fontSize: 16,
  },
  span: {
    fontFamily: 'Lato-Black',
  },
});

export default Cotizacion;
