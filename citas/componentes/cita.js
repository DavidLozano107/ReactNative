import React from 'react';
import {Text, StyleSheet, View, Button, TouchableHighlight} from 'react-native';

const Cita = ({cita, eliminarPaciente}) => {
  const dialogoEliminar = (id) => {
    console.log('Eliminando', id);

    eliminarPaciente(id);
  };

  return (
    <View style={styles.cita}>
      <View>
        <Text>Id: </Text>
        <Text style={styles.texto}> {cita.id} </Text>
      </View>
      <View>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.texto}> {cita.paciente} </Text>
      </View>
      <View>
        <Text style={styles.label}> Propietario: </Text>
        <Text> {cita.Propietario} </Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas: </Text>
        <Text style={styles.texto}> {cita.sintomas} </Text>
      </View>
      {/* <Button title="Eliminar" /> */}
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(cita.id)}
          style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}>Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    // paddingTop: 20,
    // paddingBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  texto: {
    fontSize: 18,
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  textoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cita;
