import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import validator from 'validator';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import file from "../database/firebase";



function CrearEncargado(props) {

    const [state, setState] = useState({
        mail: "",
        pass: ""
    });

    const [validar, setValidar] = useState("");
    const [password, setValidarP] = useState("");
    const [admin, setAdmin] = useState("");

    const verificador = (value, pw) => {
        setState({ ...state, mail: value });
        if (value != "") {
            if (validator.isEmail(value)) {
                setValidar("")
            } else {
                setValidar("mail invalido")
            }
        } else {
            setValidar("")
        }
    }

    const crearUsuario = async () => {

        if (validator.isEmail(state.mail)) {
            if (state.pass === "") {
                setValidarP("escriba una contraña")
                if(password == ""){
                    setAdmin("Ingrese Codigo");
                }
            } else {
                if(password === ""){
                    setAdmin("Ingrese Codigo");
                }else{
                    try {
                        const docRef = await addDoc(collection(file.data(), "encargados"), {
                            mail: state.mail,
                            pass: state.pass
                        });
                        //navigator a iniciar sesion1
                        props.navigation.navigate('inicioSesion1');
                    } catch (error) {
                        alert("ERROR");
                    }
                }
                    
            }
        } else {
            setValidar("mail invalido");
        }
    }

    return (
        <View style={styles.container}>

            <Input placeholder='email@address.com' errorStyle={{ color: 'red', margin: 5 }} errorMessage={validar}
                leftIcon={<Icon name='user' size={24} color='black' />}
                onChangeText={(value) => verificador(value)}
                leftIconContainerStyle={styles.icono} />

            <Input placeholder="password" secureTextEntry={true}
                leftIcon={<Icon name='lock' size={24} color='black' />}
                onChangeText={(value) => setState({ ...state, pass: value })} errorStyle={{ color: 'black', margin: 9 }}
                leftIconContainerStyle={styles.icono} errorMessage={password} />

            <Input placeholder="admin-pass" secureTextEntry={true}
                leftIcon={<Icon name='id-badge' size={24} color='black' />}
                leftIconContainerStyle={styles.icono} errorMessage={admin} 
                errorStyle={{ color: 'red', margin: 9 }}
                 />

            <Button title="Agregar" titleStyle={{ color: 'black' }} type="outline" buttonStyle={styles.botones}
                onPress={() => crearUsuario()} />


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
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
        marginRight: 9
    }
})

export default CrearEncargado