import React, {useState} from 'react';

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Platform,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Cita from './componentes/cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [mostrarForm, setMostrarForm] = useState(true);

  //definir el state de citas
  const [citas, setCitas] = useState([
    {
      id: '1',
      paciente: 'Hook',
      Propietario: 'David',
      sintomas: 'No come',
    },
    {
      id: '2',
      paciente: 'Rocky',
      Propietario: 'Juan',
      sintomas: 'No duerme',
    },
    {
      id: '3',
      paciente: 'Mateo',
      Propietario: 'Felipe',
      sintomas: 'No canta',
    },
  ]);

  //Elimina a el paciente del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };
  //Ocultar el teclado
  const cerrarElTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarElTeclado()}>
      <>
        <View style={style.contenedor}>
          <Text style={style.titulo}>Administrador de Citas</Text>

          <View>
            <TouchableHighlight
              onPress={() => setMostrarForm(!mostrarForm)}
              style={style.btnEliminar}>
              <Text style={style.textoEliminar}>
                {mostrarForm ? 'Administrar citas' : 'Crear nueva cita'}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={style.contenido}>
            {mostrarForm ? (
              <>
                <Text style={style.titulo}>Crea una nueva cita</Text>
                <Formulario
                  citas={citas}
                  setCitas={setCitas}
                  setMostrarForm={setMostrarForm}
                />
              </>
            ) : (
              <>
                <Text style={style.titulo}>
                  {citas.length > 0
                    ? 'Administra tus citas'
                    : 'No hay citas agrega una'}
                </Text>
                <FlatList
                  style={style.listado}
                  data={citas}
                  renderItem={({item}) => (
                    <Cita cita={item} eliminarPaciente={eliminarPaciente} />
                  )}
                  keyExtractor={(cita) => cita.id}
                />
              </>
            )}
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  btnEliminar: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 20 : 5,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
});

export default App;
