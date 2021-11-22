import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Input, Button, Text, Divider,ListItem, Icon,} from 'react-native-elements';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import file from "../database/firebase";

const detalleViaje = (props) => {

    const idV = props.route.params.key
    const idC = props.route.params.cam
    
    //console.log(idV)
    //console.log(idC)

    const [viaje, setViaje] = useState({
        origen: '',
        destinos: [],
        contacto: '',
        descripcion: '',
        hora: '',
        imo: false,
        peso: '',
        dem: false,
        valor: '',
        estado: false,
        idCamionero: ''
    })

    useEffect(async () => {

        const consulta = await getDoc(doc(file.data(), "viajes", idV))
        const vi = {
            origen: consulta.data().origen,
            destinos: consulta.data().destinos,
            contacto: consulta.data().contacto,
            descripcion: consulta.data().descripcion,
            hora: consulta.data().hora,
            imo: consulta.data().imo,
            peso: consulta.data().peso,
            dem: consulta.data().dem,
            valor: consulta.data().valor,
            estado: consulta.data().estado,
            idCamionero: consulta.data().idCamionero
        }
        setViaje(vi)

    }, [])

    function siNo(flag){
        if(flag == false){
            return('No')
        }else{
            return('Si')
        }
    }

    async function acepta(){
        const ref = doc(file.data(), "viajes", idV)
        await updateDoc(ref, { idCamionero : idC})

        props.navigation.push('viajeEnCurso',{id: idV,id2: idC})
        
    }

    return (
        <View >
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 30,
                paddingBottom: 30
            }}>
                <Text h3 >Detalle Viaje</Text>
            </View>
            <View style={styles.container}>
                <Input  value={viaje.origen} disabled={true} label='Origen' labelStyle={{ color: 'black' }} />
                <Input value={viaje.contacto} disabled={true} label='Contacto' labelStyle={{ color: 'black' }} />
                <View style={styles.container2}>
                    <Input inputStyle={styles.input} value={viaje.hora} disabled={true} label='Hora'
                        labelStyle={{ color: 'black' }} />
                    <Input inputStyle={styles.input} value={viaje.peso} disabled={true} label='Peso'
                        labelStyle={{ color: 'black' }} />
                </View>
                <View style={styles.container3}>
                    <Input inputStyle={styles.input} value={siNo(viaje.imo)} disabled={true}label='IMO'
                        labelStyle={{ color: 'black' }} />
                    <Input inputStyle={styles.input} value={siNo(viaje.dem)} disabled={true} label='Demurrage'
                        labelStyle={{ color: 'black' }} />
                    <Input inputStyle={styles.input} value={viaje.valor} disabled={true} label='Valor'
                        labelStyle={{ color: 'black' }}  placeholder="0"/>
                </View>
                <Input value={viaje.descripcion} multiline label='Descripcion' 
                labelStyle={{ color: 'black' }} 
                containerStyle={{ width: '100%', marginBottom: 30 }}
                inputStyle={{ height: '100%', paddingTop: 10 }}
                inputContainerStyle={{ height: '100%' }}
                 disabled/>
            </View>
            <Text h4 h4Style={{}}>Destinos</Text>
            <View>
                {
                    viaje.destinos.map((destino) => (
                        <ListItem key={destino.id} bottomDivider >
                            <Icon name='map-marker-alt' type='font-awesome-5' size= {15}/>
                            <ListItem.Content>
                                <ListItem.Subtitle style= {{color: 'black'}}>{destino}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 30,
                paddingBottom: 30
            }}>
                <Button  title="Aceptar Viaje" buttonStyle={{backgroundColor: 'black'}}
                onPress= {() => acepta()}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 1,
        flex: 1
    },
    container2: {
        flexDirection: 'row',
        //width: '50%',
        maxWidth: '50%',
    },
    container3: {
        flexDirection: 'row',
        //width: '50%',
        maxWidth: '33%',
    }
    ,
    input: {
        width: 10
    }
})
export default detalleViaje