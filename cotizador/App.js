import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

import axios from 'axios';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptoMoneda, setCriptoMoneda] = useState('');
  const [consultarCriptoMoneda, setconsultaCriptoMoneda] = useState('');
  const [resultadoApi, setResultado] = useState({});
  const [cargando, setcargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarCriptoMoneda) {
        //Consultar la api para obtener la cotización
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url);

        setcargando(true);
        //ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
          setconsultaCriptoMoneda(false);
          setcargando(false);
        }, 2000);
      }
    };
    cotizarCriptomoneda();
    return () => {};
  }, [consultarCriptoMoneda, criptoMoneda, moneda]);

  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E42E2" />
  ) : (
    <Cotizacion resultado={resultadoApi} />
  );

  return (
    <>
      <Header />
      <Image
        style={styles.img}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptoMoneda={criptoMoneda}
          setMoneda={setMoneda}
          setCriptoMoneda={setCriptoMoneda}
          setconsultaCriptoMoneda={setconsultaCriptoMoneda}
        />
      </View>
      <View>{componente}</View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
    marginBottom: 20,
  },
});

export default App;
