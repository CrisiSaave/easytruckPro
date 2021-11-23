import { StyleSheet, View } from 'react-native';
import { Button, ListItem, Icon, Text } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { doc, getDoc,collection,where, query,getDocs  } from 'firebase/firestore';
import file from "../database/firebase";

const perfil = (props) => {
    const id = props.route.params.cam
    const [viajes, setViajes] = useState([])
    const [camionero, setCamionero] = useState({
        contacto: '',
        direccion: '',
        fechaN: '',
        nombre: '',
        rut: ''
    })


    useEffect(async () => {

        const consulta = await getDoc(doc(file.data(), "camioneros", id))
        const vi = {
            contacto: consulta.data().contacto,
            direccion: consulta.data().direccion,
            fechaN: consulta.data().fechaN,
            nombre: consulta.data().nombre,
            rut: consulta.data().rut,
        }
        setCamionero(vi)


        const viaje = [];
        const refEncargados = collection(file.data(), "viajes");
        const q = query(refEncargados, where("idCamionero", "==", id));
        const consulta2 = await getDocs(q);
        consulta2.forEach((doc) => {
            const { origen, hora, destinos } = doc.data()
            viaje.push({
                id: doc.id,
                origen,
                hora,
                destinos
            })

        });
        setViajes(viaje)

    }, [])

return (
    <View >
        <View style={{ backgroundColor: 'black', marginTop: 20, paddingBottom: 30 }}>
            <Icon name='user' type='font-awesome' color='white' size={60} />
            <View style={{ margin: 'auto' }}>
                <Text h4 h4Style={{ color: 'white' }}> {camionero.nombre} </Text>
            </View>
            <View style={{
                flexDirection: 'row', marginLeft: '12%',
                marginTop: 30,
                marginBottom: 30
            }} >
                <View style={{ flexDirection: 'row' }}>
                    <Icon name='home' color='white' />
                    <Text h5 style={{ color: 'white', marginLeft: 10 }}>{camionero.nombre}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: '25%' }}>
                    <Icon name='phone' color='white' />
                    <Text h5 style={{ color: 'white', marginLeft: 5 }}> {camionero.contacto}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                marginLeft: '12%'
            }} >
                <View style={{ flexDirection: 'row' }}>
                    <Icon name='calendar-alt' color='white' type='font-awesome-5' />
                    <Text h5 style={{ color: 'white', marginLeft: 12 }}>{camionero.fechaN}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: '13%' }}>
                    <Icon name='id-card' color='white' type='font-awesome-5' />
                    <Text h5 style={{ color: 'white', marginLeft: 10 }} h5>{camionero.rut}</Text>
                </View>
            </View>

        </View>

        <View style={{ marginTop: 30, marginLeft: 10, marginBottom: 8 }}>
            <Text h4>Últimos Viajes</Text>
        </View>
        <View>
            {
                viajes.map((viaje) => (
                    <ListItem key={viaje.id} bottomDivider
                    onPress = {() => {
                        props.navigation.push('detalleViaje', {key: viaje.id, cam : id})
                    }}> 
                        <Icon name='map-marker-alt' type='font-awesome-5' />
                        <ListItem.Content>
                            <ListItem.Title>{viaje.origen}</ListItem.Title>
                            <ListItem.Subtitle>{
                                'Hora: ' + viaje.hora +
                                '   Destinos: ' + viaje.destinos.length
                            }</ListItem.Subtitle>

                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
            }

        </View>

    </View>
)
}

export default perfil