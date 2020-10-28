import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptoMoneda,
  setMoneda,
  setCriptoMoneda,
  setconsultaCriptoMoneda,
}) => {
  const [criptoMonedas, setCriptoMonedas] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      await setCriptoMonedas(resultado.data.Data);
    };
    consultarApi();
    return () => {};
  }, []);

  //Almacena las seleccion del usuario
  const obtenerMoneda = (monedaSeleccionada) => {
    setMoneda(monedaSeleccionada);
  };

  const obtenerCriptoMoneda = (cripto) => {
    setCriptoMoneda(cripto);
  };

  const cotizarPrecio = () => {
    console.log('Cotizando');

    //Validar Formulario
    if (moneda.trim() === '' || criptoMoneda.trim() === '') {
      mostrarAlerta();
      return;
    }

    //Cambiar el state de consultar api
    setconsultaCriptoMoneda(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Debes de seleccionar todos los campos', [
      {text: 'OK'},
    ]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda:</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(monedaSeleccionada) =>
          obtenerMoneda(monedaSeleccionada)
        }>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptoMoneda}
        onValueChange={(criptoMonedaSeleccionada) => {
          obtenerCriptoMoneda(criptoMonedaSeleccionada);
        }}>
        <Picker.Item label="- Seleccione -" value="" />
        {criptoMonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        onPress={() => cotizarPrecio()}
        style={styles.btnCortizar}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCortizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
