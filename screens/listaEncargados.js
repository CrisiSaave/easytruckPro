import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Button, ListItem, Text, Icon, Tab, TabView } from 'react-native-elements';
import { collection, getDocs, deleteDoc, doc, } from 'firebase/firestore';
import file from "../database/firebase";
import AwesomeAlert from 'react-native-awesome-alerts';





function listaEncargados(props) {

    const [aler, setAlerta] = useState(false);
    const [encargados, setEncargados] = useState([])
    const [key, setKey] = useState();


    useEffect(async () => {

        const user = [];
        const refEncargados = collection(file.data(), "encargados");
        const consulta = await getDocs(refEncargados);
        consulta.forEach((doc) => {
            const { mail, name } = doc.data()
            user.push({
                id: doc.id,
                mail,
                name
            })

        });
        setEncargados(user)

    }, [])


    async function eliminar() {
        const consulta = await deleteDoc(doc(file.data(), "encargados", key));
    }


    const alerta = (userId) => {
        setKey(userId);
        setAlerta(true);
    }

    const respuesta = (flag) => {
        if (flag === true) {
            eliminar();
            props.navigation.popToTop();

        }
        setAlerta(false);
    }
    

    return ([

        <View style={{ flexDirection: "row", height: 80, padding: 20 }}>
            <View style={{ flex: 0.1 }}  >
                <Icon name='circle' color='black' iconStyle={{ paddingTop: 10 }} />
            </View>
            <View style={{ paddingTop: 15 }}  >
                <Text
                    style={{ textAlign: 'center' }} >Deslice a la izquierda para eliminar
                </Text>
            </View>
        </View>

        ,

        encargados.map((user) => {
            return (

                <ListItem.Swipeable
                    key={user.id}
                    bottomDivider={{ marginTop: 100 }}
                    rightStyle={{ backgroundColor: 'red' }}
                    rightContent={
                        <Button
                            title="Delete"
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red', padding: (24, 24) }}
                            onPress={() => alerta(user.id)}
                        />
                    }>
                    <ListItem.Content>
                        <ListItem.Title>{user.name}</ListItem.Title>
                        <ListItem.Subtitle>{user.mail}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem.Swipeable>


            )
        }),

        <AwesomeAlert
            show={aler}
            showProgress={false}
            title="Eliminar Encargado"
            message="Seguro que desea eliminar al encargado ?"
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



const styles = StyleSheet.create({

})

export default listaEncargados