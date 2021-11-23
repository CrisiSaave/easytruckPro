import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { ListItem, Text, Icon, Divider} from 'react-native-elements';
import { collection, getDocs, query, where, orderBy} from 'firebase/firestore';
import file from "../database/firebase";



const notCamionero = (props) => {


    const id = props.route.params.id
    //console.log(props.route.params)
    const [viajes, setViajes] = useState([])

    useEffect(async () => {

        const viaje = [];
        const refEncargados = collection(file.data(), "viajes");
        const q = query(refEncargados, where("estado", "==", false));
        const consulta = await getDocs(q);
        consulta.forEach((doc) => {
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

            <Icon name='log-out' size={27} color='black' type='feather'
                containerStyle={{ marginLeft: '90%' }}
                onPress={() => props.navigation.navigate('inicioSesion2')} />

            <View style={{ margin: 'auto', paddingTop: 20, paddingBottom: 10 }}>
                <Text h3>Bienvenido</Text>
            </View>
            <View style={{ margin: 'auto', paddingBottom: 20 }}>
                <Icon name='user' type='font-awesome'
                    size={30}
                    containerStyle={{ paddingTop: 10 }}
                    onPress={() => props.navigation.push('perfil', { cam: id })} />
                <Text h6>Perfil</Text>

            </View>
            <Divider orientation="horizontal" width={1} color='black' />
            <View>
                <View style={{ marginLeft: 20, paddingBottom: 10, flexDirection: 'row' }}>
                    <Icon name='map' size={26} containerStyle={{ marginRight: 10 }} />
                    <Text h4>Notificaciones</Text>
                </View>
                <View>
                    {
                        viajes.map((viaje) => (
                            <ListItem key={viaje.id} bottomDivider
                                onPress={() => {
                                    props.navigation.push('detalleViaje', { key: viaje.id, cam: id })
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
        </View >



    )
}

export default notCamionero