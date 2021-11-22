import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Button, ListItem, Text, Icon, Tab, TabView } from 'react-native-elements';
import { collection, getDocs, deleteDoc, doc, } from 'firebase/firestore';
import file from "../database/firebase";
import AwesomeAlert from 'react-native-awesome-alerts';


const eliminarCamionero = (props) => {
    const [aler, setAlerta] = useState(false);
    const [camioneros, setcamioneros] = useState([])
    const [key, setKey] = useState();


    useEffect(async () => {

        const camionero = [];
        const refcamioneros = collection(file.data(), "camioneros");
        const consulta = await getDocs(refcamioneros);
        consulta.forEach((doc) => {
            const { nombre, patente } = doc.data()
            camionero.push({
                id: doc.id,
                nombre,
                patente
            })

        });
        setcamioneros(camionero)

    }, [])


    async function eliminar() {
        const consulta = await deleteDoc(doc(file.data(), "camioneros", key));
    }


    const alerta = (camioneroId) => {
        setKey(camioneroId);
        setAlerta(true);
    }

    const respuesta = (flag) => {
        if (flag === true) {
            eliminar();
            props.navigation.pop();

        }
        setAlerta(false);
    }
    

    return ([

        <View style={{ flexDirection: "row", height: 80, padding: 20 }}>
            <View style={{ flex: 0.1 }}  >
                <Icon name='circle' size= {10} color='black' iconStyle={{ paddingTop: 18 }} />
            </View>
            <View style={{ paddingTop: 15 }}  >
                <Text
                    style={{ textAlign: 'center' }} >Deslice a la izquierda para eliminar
                </Text>
            </View>
        </View>

        ,

        camioneros.map((camionero) => {
            return (

                <ListItem.Swipeable
                    key={camionero.id}
                    bottomDivider={{ marginTop: 100 }}
                    rightStyle={{ backgroundColor: 'red' }}
                    rightContent={
                        <Button
                            title="Delete"
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red', padding: (24, 24) }}
                            onPress={() => alerta(camionero.id)}
                        />
                    }>
                    <ListItem.Content>
                        <ListItem.Title>{camionero.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{camionero.patente}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem.Swipeable>


            )
        }),

        <AwesomeAlert
            show={aler}
            showProgress={false}
            title="Eliminar camionero"
            message="Seguro que lo desea eliminar ?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancelar"
            confirmText="Si, eliminar"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
                respuesta(false);
            }}
            onConfirmPressed={() => {
                respuesta(true);
            }}
        />,
    ]);
    
}

export default eliminarCamionero