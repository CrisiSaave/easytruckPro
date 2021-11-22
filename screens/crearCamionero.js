import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Input, Button, Text, Icon, CheckBox, ListItem } from 'react-native-elements';
import { addDoc, collection } from 'firebase/firestore';
import file from "../database/firebase";

const crearCamionero = (props) => {

    const [camion, setCamion] = useState({
        nombre: '',
        rut: '',
        contacto: '',
        direccion: '',
        fechaN: '',
        patente: '',
        tipoC: '',
        pass: ''
    })

    const [verNombre, setNombre] = useState('');
    const [verRut, setRut] = useState('');
    const [verdireccion, setDireccion] = useState('');
    const [verFecha, setFecha] = useState('');
    const [verPatente, setPatente] = useState('');
    const [verTipo, setTipo] = useState('');
    const [verContacto, setContacto] = useState('');
    const [verPass, setPass] = useState('');


    function validacion() {
        var flag = true;
        if (camion.pass == '') {
            setPass('ingrese una contraseña')
            flag = false
        } else {
            setPass('')
        }
        if (camion.nombre == '') {
            setNombre('ingrese un nombre')
            flag = false
        } else {
            setNombre('')
        }
        if (camion.rut == '') {
            setRut('ingrese un rut')
            flag = false
        } else {
            setRut('')
        }
        if (camion.direccion == '') {
            setDireccion('ingrese una direccion')
            flag = false
        } else {
            setDireccion('')
        }
        if (camion.fechaN == '') {
            setFecha('ingrese una fecha')
            flag = false
        } else {
            setFecha('')
        }
        if (camion.patente == '') {
            setPatente('ingrese una patente')
            flag = false
        } else {
            setPatente('')
        }
        if (camion.tipoC == '') {
            setTipo('ingrese tipo camion')
            flag = false
        } else {
            setTipo('')
        }
        if (camion.contacto == '') {
            setContacto('ingresar contacto')
            flag = false
        } else {
            setContacto('')
        }

        return flag;
    }

    const crearCamionero = async () => {
        if (validacion() == true) {
            const docRef = await addDoc(collection(file.data(), "camioneros"), {
                nombre: camion.nombre,
                rut: camion.rut,
                contacto: camion.contacto,
                direccion: camion.direccion,
                fechaN: camion.fechaN,
                patente: camion.patente,
                tipoC: camion.tipoC,
                pass: camion.pass
            });

            return (
                alert('Camionero creado con exito!'),
                props.navigation.goBack()
            )
        }
    }


    return (
        <View style={styles.principal}>

            <Text h4 style={{ padding: 20 }}>Crear Camionero</Text>

            <Input placeholder="Nombre" containerStyle={styles.imputs}
                leftIcon={<Icon name='user' size={26} color='black' type='font-awesome' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setCamion({ ...camion, nombre: n })}
                errorMessage={verNombre} />

            <Input placeholder="Rut" containerStyle={{ width: '85%', marginBottom: 15 }}
                leftIcon={<Icon name='address-card' size={20} color='black' type='font-awesome' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setCamion({ ...camion, rut: n })}
                errorMessage={verRut} />

            <Input placeholder="Contacto" containerStyle={{ width: '85%', marginBottom: 15 }}
                leftIcon={<Icon name='phone' size={27} color='black' type='font-awesome' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setCamion({ ...camion, contacto: n })}
                errorMessage={verContacto} />

            <Input placeholder="Direccion" containerStyle={{ width: '85%', marginBottom: 15 }}
                leftIcon={<Icon name='map-marker' size={30} color='black' type='font-awesome' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setCamion({ ...camion, direccion: n })}
                errorMessage={verdireccion} />

            <Input placeholder="Naciemiento Ej: 25/12/98" containerStyle={{ width: '85%', marginBottom: 15 }}
                leftIcon={<Icon name='calendar-week' size={25} color='black' type='font-awesome-5' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setCamion({ ...camion, fechaN: n })}
                errorMessage={verFecha} />

            <Input placeholder="Patente" containerStyle={{ width: '85%', marginBottom: 15 }}
                leftIcon={<Icon name='truck' size={26} color='black' type='font-awesome' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setCamion({ ...camion, patente: n })}
                errorMessage={verPatente} />

            <Input placeholder="Tipo Camion" containerStyle={{ width: '85%', marginBottom: 15 }}
                leftIcon={<Icon name='truck-loading' size={22} color='black' type='font-awesome-5' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setCamion({ ...camion, tipoC: n })}
                errorMessage={verTipo} />

            <Input placeholder="Contraseña" containerStyle={{ width: '85%', marginBottom: 15 }}
                leftIcon={<Icon name='lock' size={28} color='black' type='font-awesome-5' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setCamion({ ...camion, pass: n })}
                errorMessage={verPass} />

            <Button title="Agregar" titleStyle={{ color: 'black' }} type="outline"
                buttonStyle={styles.botones}
                onPress={() => crearCamionero()}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    principal: {
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
        width: 'auto',
        //flex: 0.7,
        borderColor: 'red'

    },

    segundarios: {
        //backgroundColor: 'red',
        flexDirection: 'row',
        width: '85%',
        marginTop: 10,
    },

    imputs2: {
        width: '55%'

    },

    botones: {

        //backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 3,
        width: 150,
        marginTop: 30

    },
    icono: {
        margin: 'auto',
        marginRight: 10

    },

    imputs: {
        width: '85%'
    }
})

export default crearCamionero
