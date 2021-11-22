import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Avatar, Text } from 'react-native-elements';
import { doc, getDocs, collection, query, where } from 'firebase/firestore';
import file from "../database/firebase";


const inicioSesion2 = (props) => {
    const [camionero, setCamionero] = useState({
        patente: "",
        pass: ""
    });

    const [validar, setValidar] = useState("");
    const [password, setValidarP] = useState("");

    function comprobar() {
        var flag = true
        if (camionero.patente == '') {
            setValidar('ingrese una patente')
            flag = false
        } else {
            setValidar('')
        }
        if (camionero.pass == '') {
            setValidarP('ingrese una contraseña')
            flag = false
        } else {
            setValidarP('')

        }
        return flag
    }

    const verificar = async () => {

        if (comprobar() == true) {
            const refEncargados = collection(file.data(), "camioneros");
            const q = query(refEncargados, where("patente", "==", camionero.patente));
            const consulta = await getDocs(q);
            consulta.forEach((doc) => {

                if (doc.data().patente === camionero.patente && doc.data().pass === camionero.pass) {
                    setValidar("")
                    setValidarP("")
                    props.navigation.push('notCamionero', {id: doc.id})
                }
                
            });
            setValidarP('email o contraseña incorrecta');
        }
    }

    return (
        <View style={styles.container}>


            <Avatar size="xlarge"
                rounded icon={{ name: 'truck', type: 'font-awesome', color: "black" }}
                onPress={() => props.navigation.popToTop()}
                containerStyle={{ flex: 1, margin: 'auto', }}
            />

            <Text h3>Camionero</Text>

            <Input placeholder='patente' errorStyle={{ color: 'black', margin: 5 }} 
                errorMessage={validar}
                leftIcon={<Icon name='user' size={24} color='black' />}
                onChangeText={(value) => setCamionero({ ...camionero, patente: value })}
                leftIconContainerStyle={styles.icono} />

            <Input placeholder="password" secureTextEntry={true}
                leftIcon={<Icon name='lock' size={24} color='black' type='font-awesome-5' />}
                onChangeText={(value) => setCamionero({ ...camionero, pass: value })}
                errorStyle={{ color: 'black', margin: 9 }}
                leftIconContainerStyle={styles.icono} errorMessage={password} />

            <Button title="Ingresar" titleStyle={{ color: 'black' }} type="outline" buttonStyle={styles.botones}
                onPress={() => verificar()} />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        padding: 25,
        marginBottom: 100

    },

    botones: {

        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 3,
        padding: 6,
        margin: 3

    },
    icono: {
        margin: 'auto',
        marginRight: 10
    }
})

export default inicioSesion2