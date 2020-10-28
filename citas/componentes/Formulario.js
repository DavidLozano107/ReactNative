import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import shortid from 'shortid';

const Formulario = ({citas, setCitas, setMostrarForm}) => {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };

    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  //Muestra u oculta el time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    const opciones = {
      hour: 'numeric',
      minute: '2-digit',
    };
    console.warn('A time has been picked: ', time);
    setHora(time.toLocaleString('en-US', opciones));

    hideTimePicker();
  };

  // crear una nueva cita
  const crearNuevaCita = () => {
    //Validar
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      mostrarAlerta();

      return;
    }

    //Crear una nueva cita
    const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
    cita.id = shortid.generate();
    // console.log(cita);
    // Agregar el state
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    //Ocultar el formulario
    setMostrarForm(false);
    //Resetear el formulario
  };

  //muestra la alerta si falla la validación
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //Titulo
      'Todos los campos son obligatorios',
      [
        //Cuerpo de la funcion
        {
          text: 'OK', //Atreglo de btn
        },
      ],
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.formulario}>
          <View>
            <Text style={styles.label}>Paciente: </Text>
            <TextInput
              onChangeText={(texto) => setPaciente(texto)}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.formulario}>
          <View>
            <Text style={styles.label}>Dueño: </Text>
            <TextInput
              onChangeText={(texto) => setPropietario(texto)}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.formulario}>
          <View>
            <Text style={styles.label}>Teléfono Contacto: </Text>
            <TextInput
              onChangeText={(texto) => setTelefono(texto)}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.label}>Fecha: </Text>
          <Button title="Escoger fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
          <Text>{fecha} </Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.label}>Hora: </Text>
          <Button title="Escoger Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />
          <Text>{hora} </Text>
        </View>

        <View style={styles.formulario}>
          <View>
            <Text style={styles.label}>Síntomas: </Text>
            <TextInput
              multiline
              onChangeText={(texto) => setSintomas(texto)}
              style={styles.input}
            />
          </View>

          <View>
            <TouchableHighlight
              onPress={() => crearNuevaCita()}
              style={styles.btnEliminar}>
              <Text style={styles.textoEliminar}>Crear una nueva cita </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    marginTop: 10,
    height: 40,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
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
});

export default Formulario;
