
import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Input, Button, Text, Icon, CheckBox, ListItem } from 'react-native-elements';
import { addDoc, collection } from 'firebase/firestore';
import file from "../database/firebase";

const crearViaje = (props) => {

    const [destino, setDestino] = useState('');
    const [estadoImo, setImo] = useState(false);
    const [estadoDem, setDem] = useState(false);
    const [viaje, setViaje] = useState({
        origen: '',
        hora: '',
        imo: false,
        peso: '',
        destinos: [],
        dem: false,
        valor: '',
        contacto: '',
        descripcion: ''
    });

    //validacion
    const [verOrig, setOrig] = useState('');
    const [verHora, setHora] = useState('');
    const [verVal, setVal] = useState('');
    const [verCont, setCont] = useState('');
    const [verDesc, setDesc] = useState('');
    const [verDest, setDest] = useState('');
    const [verPes, setPes] = useState('');
    const [carga, setCarga] = useState('');

    function validacion() {
        setViaje({ ...viaje, dem: estadoDem })
        setViaje({ ...viaje, imo: estadoImo })
        var flag = true;
        if (viaje.origen == '') {
            setOrig('ingrese un origen')
            flag = false
        } else {
            setOrig('')
        }
        if (viaje.hora == '') {
            setHora('ingrese una hora')
            flag = false
        } else {
            setHora('')
        }
        if (viaje.valor == '' && estadoDem == true) {
            setVal('ingrese un valor')
            flag = false
        } else {
            setVal('')
        }
        if (viaje.contacto == '') {
            setCont('ingrese un contacto')
            flag = false
        } else {
            setCont('')
        }
        if (viaje.descripcion == '') {
            setDesc('ingrese una descripcion')
            flag = false
        } else {
            setDesc('')
        }
        if (viaje.destinos.length == 0) {
            setDest('ingresar al menos un destino')
            flag = false
        } else {
            setDest('')
        }
        if (viaje.peso == '') {
            setPes('ingresar Peso')
            flag = false
        } else {
            setPes('')
        }

        return flag;
    }

    function cambiarEstado(estado) {
        if (estado == false) {
            return true
        }
        return false
    }

    function agregarViaje() {
        if (destino != "") {
            viaje.destinos.push(destino)

            return (
                //alert('destino agregado!'),
                cargar()

            )
        } else {

        }
    }
    function cargar() {
        return (

            setCarga(destino)
        )
    }

    const crearViaje = async () => {
        if (validacion() == true) {
            const docRef = await addDoc(collection(file.data(), "viajes"), {
                origen: viaje.origen,
                hora: viaje.hora,
                imo: viaje.imo,
                peso: viaje.peso,
                destinos: viaje.destinos,
                dem: viaje.dem,
                valor: viaje.valor,
                contacto: viaje.contacto,
                descripcion: viaje.descripcion,
                estado : false,
                idCamionero: ''
            });

            return(
                alert('Viaje agregado con exito'),
                props.navigation.goBack()
            )
        }
    }

    function listarDestinos() {
        return (

            viaje.destinos.map((dest) => (
                <ListItem bottomDivider
                    containerStyle={{
                        width: 275,
                        margin: 'center',
                        //backgroundColor: 'blue',
                        padding: 2
                    }}>
                    <Icon name='map-pin' size={15} type='feather' />
                    <ListItem.Content >
                        <ListItem.Title>{dest}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))


        )
    }



    return (
        <View style={styles.principal}>

            <Text h4 style={{ padding: 20 }}>Nuevo Viaje</Text>

            <Input placeholder="Origen" containerStyle={styles.imputs}
                leftIcon={<Icon name='home' size={26} color='black' type='font-awesome' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setViaje({ ...viaje, origen: n })}
                errorMessage={verOrig} />

            <View style={styles.segundarios}>

                <Input placeholder="Hora Ej 15:00" containerStyle={styles.imputs2}
                    leftIcon={<Icon name='clock' size={26} color='black'
                        type='feather' />}
                    leftIconContainerStyle={styles.icono}
                    inputStyle={{width: 30}}
                    onChangeText={(n) => setViaje({ ...viaje, hora: n })}
                    errorMessage={verHora} />

                <CheckBox center title='IMO' checked={estadoImo}
                    fontFamily='Arial'
                    checkedColor={'black'}
                    onPress={() => setImo(cambiarEstado(estadoImo))}
                    uncheckedColor={'black'}
                    size={36} />
            </View>

            <View style={styles.segundarios}>

                <Input placeholder="Peso: Kg" containerStyle={styles.imputs2}
                    leftIcon={<Icon name='weight-hanging' size={25} color='black'
                        type='font-awesome-5' />}
                    leftIconContainerStyle={styles.icono}
                    inputStyle={{width: 30}}
                    onChangeText={(n) => setViaje({ ...viaje, peso: n })}
                    errorMessage={verHora} />

            </View>

            <View style={styles.segundarios}>

                <Input placeholder="Ej: av. suecia 355, valparaiso"
                    containerStyle={{ width: '85%' }}
                    //inputStyle = {{color : 'red'}}
                    leftIconContainerStyle={{ backgroundColor: 'red' }}
                    leftIcon={<Icon name='map' size={25} color='black' type='font-awesome' />}
                    leftIconContainerStyle={styles.icono}
                    onChangeText={(n) => setDestino(n)}
                    errorMessage={verDest} />

                <Icon name='plus' type='font-awesome' containerStyle={{ marginLeft: '6%' }}
                    onPress={() => agregarViaje()} />

            </View>

            {

                listarDestinos()

            }

            <View style={styles.segundarios}>

                <Input placeholder="Por día" containerStyle={styles.imputs2}
                    leftIcon={<Icon name='usd' size={26} color='black' type='font-awesome' />}
                    leftIconContainerStyle={styles.icono}
                    onChangeText={(n) => setViaje({ ...viaje, valor: n })}
                    inputStyle={{width: 30}}
                    errorMessage={verVal}
                    disabled={cambiarEstado(estadoDem)} />

                <CheckBox center title='Demurrage' checked={estadoDem}
                    containerStyle={{ width: '50%' }}
                    fontFamily='Arial'
                    checkedColor={'black'}
                    uncheckedColor={'black'}
                    onPress={() => setDem(cambiarEstado(estadoDem))}
                    size={36} />

            </View>

            <Input placeholder="Contacto" containerStyle={{ width: '85%', marginBottom: 15 }}
                leftIcon={<Icon name='phone' size={26} color='black' type='feather' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setViaje({ ...viaje, contacto: n })}
                errorMessage={verCont} />

            <Input multiline placeholder="Descripcion"
                containerStyle={{ width: '85%', height: 65 }}
                inputStyle={{ height: '100%', paddingTop: 10 }}
                inputContainerStyle={{ height: '100%' }}
                leftIcon={<Icon name='align-center' size={26} color='black' type='feather' />}
                leftIconContainerStyle={styles.icono}
                onChangeText={(n) => setViaje({ ...viaje, descripcion: n })}
                errorMessage={verDesc} />

            <Button title="Agregar" titleStyle={{ color: 'black' }} type="outline"
                buttonStyle={styles.botones}
                onPress={() => crearViaje()}
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

export default crearViaje